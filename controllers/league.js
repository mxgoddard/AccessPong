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

function AddToLeague(leagueId, userId)
{
    db.one('INSERT INTO tbl_leagueUserLink (leagueId, userId) VALUES ($<leagueId>, $<userId>) RETURNING *;', {
        leagueId, userId
    }).then(() => {
        return;
    });
}