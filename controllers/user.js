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

function AddUserToDatabase(user)
{
    const { firstName, lastName, email } = user;
    console.log(firstName, lastName, email);

    try 
    {
        console.log('succeeded');
        db.one('INSERT INTO tbl_user (firstName, lastName, email) VALUES ($<firstName>, $<lastName>, $<email>) RETURNING *;', {
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