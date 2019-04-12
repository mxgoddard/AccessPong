const db = require('../db');

exports.registerLeague = (req, res) => {
    const { people } = req.body;

    db.one('INSERT INTO tbl_league (leagueName, amountPeople, startDate) VALUES ($<leagueName>, $<people.length>, $<startDate>) RETURNING *;', {
        ...req.body
    }).then(league => {
        people.forEach(userId => {
            AddToLeague(league.id, userId);
        });

        // Generate fixtures
        GenerateFixtures(people, league.id);

        res.send(league);  
    });
};

exports.viewLeague = (req, res) => {
    const { league_id } = req.params;

    db.any('SELECT * FROM tbl_league WHERE id=$1', [league_id])
    .then(league => {
        if (league.length)
        {
            // Get all people in league and add to custom object
            let promise = new Promise(function(resolve, reject) {
                db.any('SELECT DISTINCT id, firstName, lastName FROM tbl_user, tbl_leagueUserLink WHERE tbl_leagueUserLink.leagueId=$1', [league_id])
                .then(users => {
                    console.log(users);
                    resolve(users);
                })
            });

            promise.then(function(users) {
                league[0].users = users

                console.log('hello?');
                // league.users = users;
                res.send(league);
            });

            
        }
        else
        {
            res.send({ succeeded: false, msg: "Can't find league for the given id" });
        }
        
    })
    .catch(err => {
        res.send({ error: err.message});
    });
};

// Must be valid userIds
function AddToLeague(leagueId, userId)
{
    db.one('INSERT INTO tbl_leagueUserLink (leagueId, userId) VALUES ($<leagueId>, $<userId>) RETURNING *;', {
        leagueId, userId
    }).then(() => {
        return;
    });
};

function GenerateFixtures(players, leagueId)
{
    // players is an array of userIds
    console.log(players);
    /*
    [{ ref: 1, userId: 43 }, { ref: 2, userId: 21 }, { ref: 3, userId: 36 }]
    */
   let pairings = [];
    for (let i = 0; i < players.length; i++)
    {
        let newPair = { ref: i+1, userId: players[i] };
        pairings.push(newPair);
    };

    console.log(pairings);

    let numMatches = (players.length * (players.length-1))/2;

    // Implement circle method - (circular queue)

    // If odd number of players, add 'dummy' player denoted by userId: -1
    if ((players.length % 2) != 0) pairings.push({ ref: players.length+1, userId: -1 });

    let circularQueue = [];
    for (let i = 1; i < pairings.length+1; i++)
    {
        circularQueue.push(i);
    }

    console.log(circularQueue);

    let frontPtr = pairings.length-1;
    let backPtr = 1;

    let newFixtures = [];

    // Inital matchups
    for (let i = 0; i < (pairings.length/2); i++)
    {
        newFixtures.push({ playerOne: circularQueue[i], playerTwo: circularQueue[pairings.length-i-1] });
    }

    console.log(newFixtures);

    let fixtureLoop = players.length - 1;
    if (players.length % 2 == 0)
    {
        fixtureLoop = players.length -2;
    }
    for (let i = 0; i < fixtureLoop; i++)
    {
        // Rotate
        let copyQueue = [];
        copyQueue[0] = 1;

        for (let i = 1; i < pairings.length; i++)
        {
            if (i == backPtr)
            {
                copyQueue[i] = circularQueue[frontPtr]
            } 
            else 
            {
                copyQueue[i] = circularQueue[i-1]
            }
        }

        console.log('After rotation');
        console.log(copyQueue);

        circularQueue.length = 0;
        circularQueue = copyQueue;

        for (let i = 0; i < (pairings.length/2); i++)
        {
            newFixtures.push({ playerOne: circularQueue[i], playerTwo: circularQueue[pairings.length-i-1] });
        }

        console.log('Second round of matchups');
        console.log(newFixtures);

    }
};