const fs = require('fs');
const csv = require('csv-parser');


function findTop10EconomyBowler(matches, deliveries) {
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

    for (const [key, value] of totalBallPerBowler) {
        let eco = totalRunPerBowler.get(key) * 6 / totalBallPerBowler.get(key);
        economyPerBowler.set(key, eco);
    }

    //economyPerBowler = new Map([...economyPerBowler.entries()].sort());// sort by key
    const topEconomyBowler = new Map([...economyPerBowler.entries()].sort((a, b) => a[1] - b[1]));

    const top10EconomyBowler = new Map();
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
}
module.exports = findTop10EconomyBowler;

   