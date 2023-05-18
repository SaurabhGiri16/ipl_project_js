const fs = require('fs');
const csv = require('csv-parser');

const matches = [];
const deliveries = [];

fs.createReadStream('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        matches.push(data);
    })
    .on('end', () => {
        const winner = [];
        const noOfMatchesPlayedPerYear = new Map();

        for (let i = 0; i < matches.length; i++) {
            if (noOfMatchesPlayedPerYear.has(matches[i].season)) {
                noOfMatchesPlayedPerYear.set(matches[i].season, noOfMatchesPlayedPerYear.get(matches[i].season) + 1);
            } else {
                noOfMatchesPlayedPerYear.set(matches[i].season, 1);
                winner.push(matches[i].winner);
            }
        }

        console.log("1. No of Matches Played Per Year: ");
        console.log();
        console.log(new Map([...noOfMatchesPlayedPerYear.entries()].sort()));

        let jsonData = JSON.stringify(Object.fromEntries(noOfMatchesPlayedPerYear), null, 6);
        fs.writeFile('../public/output/noOfMatchesPlayedPerYea.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });

        const noOfMatchesWonPerTeamPerYear = new Map();

        for (let i = 0; i < winner.length; i++) {
            const noOfMatchesWonPerTeam = new Map();
            for (let j = 0; j < matches.length; j++) {
                if (winner[i] == matches[j].winner) {
                    if (noOfMatchesWonPerTeam.has(matches[j].season)) {
                        noOfMatchesWonPerTeam.set(matches[j].season, noOfMatchesWonPerTeam.get(matches[j].season) + 1);
                    } else {
                        noOfMatchesWonPerTeam.set(matches[j].season, 1);
                    }
                }
            }

            const noOfMatchWonPerTeamData = Array.from(noOfMatchesWonPerTeam);
            noOfMatchesWonPerTeamPerYear.set(winner[i], noOfMatchWonPerTeamData);

        }

        console.log("2. No of Matches Won per Team:");
        console.log();
        console.log(new Map([...noOfMatchesWonPerTeamPerYear.entries()].sort()));

        jsonData = JSON.stringify(Object.fromEntries(noOfMatchesWonPerTeamPerYear), null, 1);
        fs.writeFile('../public/output/noOfMatchesWonPerTeamPeryear.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });

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

                console.log("4. Top 10 economical bowlers in the year 2015");
                console.log();
                const totalRunPerBowler = new Map();
                const totalBallPerBowler = new Map();
                for (i = 0; i < matches.length; i++) {
                    if (matches[i].season == '2015') {
                        str = matches[i].id;
                        for (j = 0; j < deliveries.length; j++) {
                            if (deliveries[j].match_id == str) {
                                if (totalRunPerBowler.has(deliveries[j].bowler)) {
                                    totalRunPerBowler.set(deliveries[j].bowler, totalRunPerBowler.get(deliveries[j].bowler) + parseInt(deliveries[j].total_runs))
                                } else {
                                    totalRunPerBowler.set(deliveries[j].bowler, parseInt(deliveries[j].total_runs));
                                }
                                if (totalBallPerBowler.has(deliveries[j].bowler)) {
                                    totalBallPerBowler.set(deliveries[j].bowler, totalBallPerBowler.get(deliveries[j].bowler) + 1);
                                } else {
                                    totalBallPerBowler.set(deliveries[j].bowler, 1);
                                }
                            }
                        }
                    }
                }

                let economyPerBowler = new Map();
                let top10EconomyBowler = new Map();

                for (const [key, value] of totalBallPerBowler) {
                    let eco = totalRunPerBowler.get(key) * 6 / totalBallPerBowler.get(key);
                    economyPerBowler.set(key, eco);
                }

                //economyPerBowler = new Map([...economyPerBowler.entries()].sort());// sort by key
                const topEconomyBowler = new Map([...economyPerBowler.entries()].sort((a, b) => a[1] - b[1]));

                
                var count = 0;
                for (const [key, value] of topEconomyBowler) {
                    count++;
                    if (count > 10) {
                        break;
                    }
                    console.log(key, value);
                    top10EconomyBowler.set(key, value);

                }

                 jsonData = JSON.stringify(Object.fromEntries(top10EconomyBowler), null, 6);
                fs.writeFile('../public/output/top10EconomyBowler.json', jsonData, (error) => {
                    if (error) {
                        console.error('Error:', error);
                        return;
                    }
                    console.log('Output JSON file has been written successfully.');
        });

    });
});


