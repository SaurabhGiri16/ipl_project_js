const fs = require('fs');
const csv = require('csv-parser');

const findNoOfMatchesPlayedPerYear = require('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/server/noOfMatchesPlayedPerYear.js');
const findNoOfMatchesWonPerTeamPerYear = require('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/server/noOfMatchesWonPerTeamPerYear.js');
const findExtraRunConcededPerTeam = require('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/server/extraRunConcededPerteam.js');
const findTop10EconomyBowler = require('/home/saurabhgiri/Project_Mountblue/ipl_project_using_JS/src/server/top10EconomyBowler.js');


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
                findNoOfMatchesPlayedPerYear(matches);
                findNoOfMatchesWonPerTeamPerYear(matches);
                findExtraRunConcededPerTeam(matches, deliveries);
                findTop10EconomyBowler(matches, deliveries);



            });
    });


