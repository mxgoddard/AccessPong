const db = require('../db');

exports.setMatchWinner = (req, res) => {
    // const { matchId, playerOneId, playerTwoId, winnerId } = req.body;
    const { matchId, playerOneId, playerTwoId, winnerId } = req.body;

    // Update tbl_fixture with winnerId
    db.one('UPDATE tbl_fixture SET winnerId=$1 WHERE id=$2 RETURNING *', [winnerId, matchId])
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });

    // Update tbl_leagueUserLink

    // Update tbl_user for player1

    // Update tbl_user for player2
};