const fs = require('fs');


 const year = [];

    function findNoOfMatchesPlayedPerYear(matches){
        const noOfMatchesPlayedPerYear = new Map();
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

        let jsonData = JSON.stringify(Object.fromEntries(noOfMatchesPlayedPerYear), null, 6);

        fs.writeFile('../public/output/noOfMatchesPlayedPerYea.json', jsonData, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });
    }
    module.exports=findNoOfMatchesPlayedPerYear;

   