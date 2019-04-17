# AccessPong-BE

Back-end repository for AccessPong. App designed for a table-tennis league at AccessPay.

Roadmap: https://trello.com/b/z7dJJTFM/accesspong

Front-end repository: Coming soon...

DAL repository: (TBD...)

Back-end repository: https://github.com/mxgoddard/AccessPong-BE

## Endpoints

Where xyz is the address

```
POST - www.xyz.com/api/user/register

POST - www.xyz.com/api/user/login

GET  - www.xyz.com/api/user/profile/[userId]

POST - www.xyz.com/api/league/register

GET  - www.xyz.com/api/league/[leagueId]

```

## Dev Info

### Scripts

Seed database:

```js
npm run seed
```

Populate database:

```js
npm run data
```


### PostgresSQL

Navigating postgres:

```
psql   - Enter postgres mode

\q     - Exit postgres mode

\list  - List databases

\c     - Connect to a database

\dt    - Show tables in database

\dS    - Shows specific table type
```

**SQL queries can be run directly in the postgres terminal**


### Endpoint Objects

#### Register User

JSON object for registering user details where the password has been encrypted.

**POST - www.xyz.com/api/user/register**

```json
{
	"firstName": "John",
	"lastName": "Smith",
	"email": "JohnSmith@gmail.com",
	"password": "!D#F$H%JJ*K"
}
```


#### User Login

JSON object for logging into a user where the password has already been encrypted.

**POST - www.xyz.com/api/user/login**

```json
{
	"email": "JohnSmitch@gmail.com",
	"pass": "!D#F$H%JJ*K"
}
```


#### Register League

JSON object for registering league details where people takes an array of userIds. This will generate and insert a list of fixtures for the tbl_fixture table.

**POST - www.xyz.com/api/league/register**

```json
{
	"leagueName": "Test League",
	"people": [67, 24, 38],
	"startDate": "09-04-2019"
}
```


#### View League

JSON object for getting an enriched object of a league complete with relevant user objects. :league_id must be substituted for an integer. You would get back something like the following.

**GET - www.xyz.com/api/league/:league_id**

```json
{
    "id": 1,
    "leaguename": "Test League 1",
    "amountpeople": 3,
    "startdate": "2000-05-07T23:00:00.000Z",
    "users": [
        {
            "id": 1,
            "firstname": "John",
            "lastname": "Smith"
        },
        {
            "id": 3,
            "firstname": "Bob",
            "lastname": "Michaels"
        },
        {
            "id": 2,
            "firstname": "Ben",
            "lastname": "Foster"
        }
    ]
}
```


#### View User

Returns a json object with public information about the specified user where user_id is the desired userId.

**GET - www.xyz.com/api/user/profile/:user_id**

```json
{
    "firstname": "John",
    "lastname": "Smith",
    "wins": 0,
    "played": 0
}
```


#### Set Match Winner

Updates relevant tables (tbl_user, tbl_leagueUserLink & tbl_fixture) with the appropriate data.

**POST - www.xyz.com/api/match/finished**

```json
{
	"matchId": 	1,
	"playerOneId": 2,
	"playerTwoId": 3,
	"winnerId": 3
}
```

### Technologies

* JavaScript
* NodeJS
* ExpressJS
* PostgreSQL