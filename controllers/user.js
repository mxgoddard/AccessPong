/* JSON object for posting details

{
	"firstName": "Max",
	"lastName": "Goddard",
	"email": "maxolivergoddard@gmail.com"
}

*/

exports.register = (req, res) => {
    console.log('Post for register method');
    let details = req.body;
    let firstName = details.firstName, lastName = details.lastName, email = details.email;
    console.log('firstName:', firstName);

    // Add to database
};