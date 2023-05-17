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
        for (let i = 0; i < matches.length; i++) {
            if (noOfMatchesPlayedPerYear.has(matches[i].season)) {
                noOfMatchesPlayedPerYear.set(matches[i].season, noOfMatchesPlayedPerYear.get(matches[i].season) + 1);
            } else {
                noOfMatchesPlayedPerYear.set(matches[i].season, 1);
                year.push(matches[i].season);
            }
        }

        console.log("1. No of Matches Played Per Year: ");
        console.log();
        console.log(new Map([...noOfMatchesPlayedPerYear.entries()].sort()));

        let jsonObject = Object.fromEntries(noOfMatchesPlayedPerYear);
        let jsonString = JSON.stringify(jsonObject);
        let jsonData = JSON.stringify(jsonString, null, 2);
        fs.writeFile('../public/output/noOfMatchesPlayedPerYea.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });

    });