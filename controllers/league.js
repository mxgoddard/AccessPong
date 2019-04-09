const db = require('../db');

exports.registerLeague = (req, res) => {
    const { people } = req.body;

    db.one('INSERT INTO tbl_league (leagueName, amountPeople, startDate) VALUES ($<leagueName>, $<people.length>, $<startDate>) RETURNING *;', {
        ...req.body
    }).then(league => {
        people.forEach(userId => {
            AddToLeague(league.id, userId);
        });
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

function AddToLeague(leagueId, userId)
{
    db.one('INSERT INTO tbl_leagueUserLink (leagueId, userId) VALUES ($<leagueId>, $<userId>) RETURNING *;', {
        leagueId, userId
    }).then(() => {
        return;
    });
}