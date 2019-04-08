# AccessPong-BE

Back-end repository for AccessPong. App designed for a table-tennis league at AccessPay.

Roadmap coming soon...

Front-end repository: Coming soon...

DAL repository: Coming soon...

Back-end repository: https://github.com/mxgoddard/AccessPong-BE

## Dev Info

#### Scripts

Seed database:

```js
npm run seed
```

#### Endpoint Objects

JSON object for posting user details:

{
	"firstName": "John",
	"lastName": "Smith",
	"email": "John.Smith@gmail.com"
}

#### PostgresSQL

Navigating postgres:

psql   - Enter postgres mode

\q     - Exit postgres mode

\list  - List databases

\c     - Connect to a database

\dt    - Show tables in database

\dS    - Shows specific table type

*SQL queries can be run directly in the postgres terminal*


Run GenerateDB.sql script

```js
psql -d db_access_pong -a -f data.sql
```