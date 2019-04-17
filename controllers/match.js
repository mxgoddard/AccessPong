const db = require('../db');

exports.setMatchWinner = (req, res) => {
    const { matchId, playerOneId, playerTwoId, winnerId } = req.body;

    // Update tbl_fixture with winnerId
    db.one('UPDATE tbl_fixture SET winnerId=$1 WHERE id=$2 RETURNING *', [winnerId, matchId])
        .then(() => {

        })
        .catch(err => {
            res.send({ msg: 'Error updating fixture table with winner.', error: err});
        });

    // Update tbl_leagueUserLink
    db.one('SELECT leagueId FROM tbl_fixture WHERE id=$1', [matchId])
    .then(data => {
        if (data != null)
        {
        
            db.one('UPDATE tbl_leagueUserLink SET points=points+3 WHERE leagueId=$1 AND userId=$2 RETURNING *', [data.leagueid, winnerId])
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.send({ msg: 'Error updating league user table with points.', error: err});
                });

        }
        else
        {
            res.send({ succeeded: false, msg: "Can't find user for the given id" });
        }
        
    })
    .catch(err => {
        res.send({ msg: 'Error retrieving league id for given match id.', error: err});
    });





    // Update tbl_user for player1
    const oneWon = winnerId == playerOneId ? 1 : 0;

    db.one('UPDATE tbl_user SET wins=wins+$1, played=played+1 WHERE id=$2 RETURNING *', [oneWon, playerOneId])
    .then(userData => {
        console.log(userData);
    })
    .catch(err => {
        res.send({ msg: 'Error updating user table for player 1.', error: err});
    });

    // Update tbl_user for player2
    const twoWon = winnerId == playerTwoId ? 1 : 0;

    db.one('UPDATE tbl_user SET wins=wins+$1, played=played+1 WHERE id=$2 RETURNING *', [twoWon, playerTwoId])
    .then(userData => {
        console.log(userData);
    })
    .catch(err => {
        console.log(err);
        res.send({ msg: 'Error updating user table for player 2.', error: err});
    });
};