const fs = require('fs');
const csv = require('csv-parser');

const year = [];
const matches = [];
const deliveries = [];

fs.createReadStream('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        matches.push(data);
    })
    .on('end', () => {
        
        
        fs.createReadStream('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/data/deliveries.csv')
            .pipe(csv())
            .on('data', (data) => {
                deliveries.push(data);
            })
            .on('end', () => {


                const extraRunConcededPerteam = new Map();


                for (i = 0; i < matches.length; i++) {
                    if (matches[i].season == "2016") {
                        let str = matches[i].id;
                        for (j = 0; j < deliveries.length; j++) {
                            if (deliveries[j].match_id == str) {
                                if (extraRunConcededPerteam.has(deliveries[j].batting_team)) {
                                    extraRunConcededPerteam.set(deliveries[j].batting_team, extraRunConcededPerteam.get(deliveries[j].batting_team) + parseInt(deliveries[j].extra_runs, 10));
                                } else {
                                    extraRunConcededPerteam.set(deliveries[j].batting_team, parseInt(deliveries[j].extra_runs, 10));
                                }
                            }
                        }
                    }

                }
                console.log("3. extra Run Conceded Per Team in: 2016");
                console.log();
                console.log(new Map([...extraRunConcededPerteam.entries()].sort()));

                let jsonData = JSON.stringify(Object.fromEntries(extraRunConcededPerteam), null, 6);

                fs.writeFile('../public/output/extraRunConcededPerteamin2016.json', jsonData, (error) => {
                    if (error) {
                        console.error('Error:', error);
                        return;
                    }
                    console.log('Output JSON file has been written successfully.');
                });
            });
        });