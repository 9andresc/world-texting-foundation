# World Texting Foundation API
A simple Node.js server that provides an API for WTF (World Texting Foundation)

# Installation
1. Install dependencies
```bash
$ npm i
```
2. Run DB migrations
```bash
$ npm run dbm:run
```
3. Run DB seeds
```bash
$ npm run dbs:run
```
4. Create .env file in root with this content
```
JWT_SECRET=
PORT=3000
```
5. Run script to generate JWT secret
```bash
$ npm run generateSecret
```
6. Fill `JWT_SECRET` value
```
JWT_SECRET=<value>
PORT=3000
```

# Usage
- To start the API server run
```bash
$ npm start
```
- There's a Postman collection ready to be imported inside `/src/docs`
- If you want to use the guarded endpoints `PUT` and `DELETE` /acronym/:acronym, generate a token running
```bash
$ npm run generateToken
```

# Acknowledgments
- Use JSON Schema to validate params, queryParams, and body
- Document API using Swagger to have a more universal way to test the endpoints
- Use Docker to containerize API, and maybe even use a more robust database like PostgreSQL in conjunction
- After using `knex` as query builder I now realize how difficult will be to mock the API due to the functions chaining. Maybe replaced it with an ORM could have been a better approach
