const fs = require('fs');
const csv = require('csv-parser');

const noOfMatchesPlayedPerYear = new Map();

const year = [];
const matches = [];

fs.createReadStream('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        matches.push(data);
    })
    .on('end', () => {

        const year = [];
        for(i=0; i<matches.length; i++){
            if(!(year.includes(matches[i].season))){
                year.push(matches[i].season);
            }
        }
        
        const noOfMatchesWonPerTeamPerYear = new Map();

        for (let i = 0; i < year.length; i++) {
            const noOfMatchesWonPerTeam = new Map();
            for (let j = 0; j < matches.length; j++) {
                if (year[i] == matches[j].season) {
                    if (noOfMatchesWonPerTeam.has(matches[j].winner)) {
                        noOfMatchesWonPerTeam.set(matches[j].winner, noOfMatchesWonPerTeam.get(matches[j].winner) + 1);
                    } else {
                        noOfMatchesWonPerTeam.set(matches[j].winner, 1);
                    }
                }
            }

            noOfMatchesWonPerTeamPerYear.set(year[i], noOfMatchesWonPerTeam);

        }
        console.log("2. No of Matches Won per Team:");
        console.log();
        console.log(noOfMatchesWonPerTeamPerYear);


        jsonObject = Object.fromEntries(noOfMatchesWonPerTeamPerYear);
        jsonString = JSON.stringify(jsonObject);
        jsonData = JSON.stringify(jsonString, null, 2);
        fs.writeFile('../public/output/noOfMatchesWonPerTeamPeryear.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });

    });
