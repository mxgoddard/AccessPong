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
                    resolve(users);
                })
            });

            promise.then(function(users) {
                league[0].users = users
                res.send(league[0]);
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
    // I know this method is disgusting and there are probably a million ways to make it not shit
    /*
    [{ ref: 1, userId: 43 }, { ref: 2, userId: 21 }, { ref: 3, userId: 36 }]
    */
   let pairings = [];
    for (let i = 0; i < players.length; i++)
    {
        let newPair = { ref: i+1, userId: players[i] };
        pairings.push(newPair);
    };

    // let numMatches = (players.length * (players.length-1))/2;

    // If odd number of players, add 'dummy' player denoted by userId: -1
    let fixtureLoop = players.length - 2;
    if ((players.length % 2) != 0) 
    {
        pairings.push({ ref: players.length+1, userId: -1 });
        fixtureLoop = players.length -1;
    }

    // Create lookup table 
    let refIdTable = {};
    // for (let i = 0; i < pairings.length; i++)
    //

    let circularQueue = [];
    for (let i = 1; i < pairings.length+1; i++)
    {
        circularQueue.push(i);
    }

    let frontPtr = pairings.length-1;
    let backPtr = 1;
    let newFixtures = [];

    // Inital fixtures
    for (let i = 0; i < (pairings.length/2); i++)
    {
        newFixtures.push({ playerOne: circularQueue[i], playerTwo: circularQueue[pairings.length-i-1] });
    }
    
    for (let i = 0; i < fixtureLoop; i++)
    {
        let copyQueue = [];
        copyQueue[0] = 1;
        
        // Rotate
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

        // Deep clone copyQueue into circularQueue
        circularQueue = [...copyQueue];

        // Add to pairings
        for (let i = 0; i < (pairings.length/2); i++)
        {
            newFixtures.push({ playerOne: circularQueue[i], playerTwo: circularQueue[pairings.length-i-1] });
        }
    }

    let matchCount = 0;

    // Convert pairings ref numbers to usersIds
    for (let i = 0; i < newFixtures.length; i++)
    {
        const playerOneId = pairings[newFixtures[i].playerOne-1].userId;
        const playerTwoId = pairings[newFixtures[i].playerTwo-1].userId;

        if ((playerOneId != -1) && (playerTwoId != -1))
        {
            matchCount++;
            db.one('INSERT INTO tbl_fixture (leagueId, matchNum, playerOneId, playerTwoId) VALUES ($1, $2, $3, $4) RETURNING *;', [leagueId, matchCount, playerOneId, playerTwoId], {

            }).then(() => {

            });

        }
    }
};

// function GetIdFromRef(pairings, ref)
// {
//     return pairings[ref-1].userId;
// };