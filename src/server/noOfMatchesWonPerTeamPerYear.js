const fs = require('fs');


    function findNoOfMatchesWonPerTeamPerYear(matches){

        const winner = [];
        for (i = 0; i < matches.length; i++) {
            if (!(winner.includes(matches[i].winner))) {
                winner.push(matches[i].winner);
            }
        }

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
            noOfMatchesWonPerTeamPerYear.set(winner[i], noOfMatchWonPerTeamData.sort());
        }

        console.log("2. No of Matches Won per Team:");
        console.log();
        console.log(new Map([...noOfMatchesWonPerTeamPerYear.entries()].sort()));

        jsonData = JSON.stringify(Object.fromEntries(new Map([...noOfMatchesWonPerTeamPerYear.entries()].sort())), null, 2);
        fs.writeFile('../public/output/noOfMatchesWonPerTeamPeryear.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });
    }

    module.exports=findNoOfMatchesWonPerTeamPerYear;
