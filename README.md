# Storefront Backend Project

## Table of Contents

* [Dependencies](#Dependencies)
* [Dev Dependencies](#DevDependencies)
* [.env file contents](#.env-file-contents)
* [Dev Dependencies](#Dev-Dependencies)
* [DB Creation and Migrations](#DB-Creation-and-Migrations)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)
* [Endpoints](#Endpoints)
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

# DB Creation and Migrations
 - Install postgres`
 - Port used: Default postgres port 5432
 - Production database - storefront_dev
 - Test Database - storefront_test
 - User: postgres
 - Password: admin

**Development Database**
```
CREATE DATABASE storefront_dev;
```
**Test Database**
```
CREATE DATABASE storefront_test;
```
**Install Dependencies**
```
npm install
```
**DB Creation and Migrations**
``` 
npm run migration-run
```
**Starting the project
    Make sure to have Port 5000 available for Express server and port 5423 for PostgreSQL server 
```
npm run  start
```
### 4. Running the tests
```
    npm run test
```
# Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


# Database Schema
 #### Products table
- id - serial primary key 
- name - varchar - Cannot be null
- price - numeric(17,2) - Cannot be null

#### Users table
- id - serial primary key
- firstname - varchar - Cannot be null
- lastname - varchar - Cannot be null
- password - varchar  - Cannot be null

#### Order_Products table
- id - serial primary key
- quantity - integer  - Cannot be null
- order_id - bigint references orders(id)  - Cannot be null
- product_id - bigint references products(id)  - Cannot be null

#### Orders
- id - serial primary key
- user_id
- status of order (active or complete)
