# Storefront Backend Project

## Table of Contents

* [Dependencies](#Dependencies)
* [Dev Dependencies](#DevDependencies)
* [.env file contents](#.env-file-contents)
* [Dev Dependencies](#Dev-Dependencies)
* [Database setup](#Database-setup)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)
* 
*
# Dependencies:
    - express - Node.js web app framework
    - dotenv - Load environment variables
    - pg  - PostgreSQL client
    - bcrypt - Password hashing
    - jsonwebtoken - JSON web tokens
    - db-migrate - Database migration tool
    - db-migrate-pg - PostgreSQL driver for DB

# Dev Dependencies:
    - eslint -  Linter
    - prettier -  Code formatting
    - eslint-plugin-prettier -  Run prettier as an eslint rule
    - jasmine-ts - Jasmine unit testing
    - jasmine-spec-reporter -  Jasmine test output formatting
    - nodemon -  - Monitor files & auto restart node
    - supertest -  HTTP testing
    - ts-node -  Typescript node.js

# .env file contents
    PORT=5000
    NODE_ENV=dev
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_DB=storefront_dev
    POSTGRES_DB_TEST=storefront_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=admin
    BCRYPT_PASSWORD=your_pass_word
    SALT_ROUNDS=10
    TOKEN_SECRET=your_scret_token


# Database setup
 - Install postgres`
 - Port used: Default postgres port 5432
 - Production database - storefront_dev
 - Test Database - storefront_test
 - User: postgres
 - Password: admin

# Instructions

### 1. Install Dependencies
```
npm install
```
### 2.  DB Creation and Migrations
``` 
npm run migration-run
```
### 3. Starting the project
    Make sure to have Port 5000 available for Express server and port 5423 for PostgreSQL server 
```
    npm run  start
```

### 4. Running the tests
```
    npm run test
```
