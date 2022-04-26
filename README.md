# Database setup
 - Install postgres`
 - Port used: Default postgres port 5432
 - Production database - storefront_dev
 - Test Database - storefront_test
 - User: postgres
 - Password: admin


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


# npm scripts

- npm run prettier - run prettier"

- npm run lint - run lint with prettier plugin, and auto fix issues." 

- npm run test - Set environment to test, create test database, run jasmine, then drop test database.

- npm run start-dev - start development app"

- npm run build - build production version of app in ./dist/ folder"

# Package Installation Instructions

## Dependencies:
- express - Node.js web app framework
- dotenv - Load environment variables
- pg  - PostgreSQL client
- bcrypt - Password hashing
- jsonwebtoken - JSON web tokens
- db-migrate - Database migration tool
- db-migrate-pg - PostgreSQL driver for DB

## Dev Dependencies:
- eslint -  Linter
- prettier -  Code formatting
- eslint-plugin-prettier -  Run prettier as an eslint rule
- jasmine-ts - Jasmine unit testing
- jasmine-spec-reporter -  Jasmine test output formatting
- nodemon -  - Monitor files & auto restart node
- supertest -  HTTP testing
- ts-node -  Typescript node.js

# Endpoints
 - See REQUIREMENTS.md file

 # Database Schema
 - See REQUIREMENTS.md file
