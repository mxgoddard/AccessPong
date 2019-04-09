const db = require('../db');

exports.register = (req, res) => {

    // Check email is unique
    db.any('SELECT id FROM tbl_user WHERE email=$1;', [req.body.email])
        .then(found => {
            console.log(found.length);
            if (!found.length)
            {
                res.send(AddUserToDatabase(req.body));
            }
            else
            {
                res.send({ succeeded: false, msg: "Email already exists." });
            }
        })
        .catch(err => {
            console.log(err.message);      
            return false; 
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    db.any('SELECT * FROM tbl_user WHERE email=$1 AND password=$2', [email, password])
        .then(user => {
            if (user.length)
            {
                res.send(user);
            }
            else
            {
                res.send({ succeeded: false, msg: "Can't find user for that username or password" });
            }
            
        })
        .catch(err => {
            res.send({ error: err.message});
        });
};

exports.profile = (req, res) => {
    const { user_id } = req.params;

    db.any('SELECT firstName, lastName, wins, played FROM tbl_user WHERE id=$1', [user_id])
    .then(user => {
        if (user.length)
        {
            res.send(user);
        }
        else
        {
            res.send({ succeeded: false, msg: "Can't find user for the given id" });
        }
        
    })
    .catch(err => {
        res.send({ error: err.message});
    });
};

function AddUserToDatabase(user)
{
    const { firstName, lastName, email, password } = user;
    console.log(firstName, lastName, email, password);

    try 
    {
        console.log('succeeded');
        db.one('INSERT INTO tbl_user (firstName, lastName, email, password) VALUES ($<firstName>, $<lastName>, $<email>, $<password>) RETURNING *;', {
            ...user
        }).then(user => {
            return user;
        });
    }
    catch (err)
    {
        console.log(err.message);
        return err.message;
    }
}