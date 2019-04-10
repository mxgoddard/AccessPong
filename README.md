# AccessPong-BE

Back-end repository for AccessPong. App designed for a table-tennis league at AccessPay.

Roadmap coming soon: https://trello.com/b/z7dJJTFM/accesspong

Front-end repository: Coming soon...

DAL repository: Coming soon...

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

#### Scripts

Seed database:

```js
npm run seed
```


#### PostgresSQL

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


#### Endpoint Objects

JSON object for registering user details:

**POST - www.xyz.com/api/user/register**

```json
{
	"firstName": "Max",
	"lastName": "Goddard",
	"email": "a@gmail.com",
	"password": "$1$O3JMY.Tw$AdLnLjQ/5jXF9.MTp3gHv/"
}
```

JSON object for registering league details:

**POST - www.xyz.com/api/league/register**

```json
{
	"leagueName": "test league",
	"people": [1, 2, 3],
	"startDate": "09-04-2019"
}
```