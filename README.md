# Storefront Backend Project

## Table of Contents

* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)

## Prerequisites
Your machine must have the following installed on it:
- [Node/NPM](https://nodejs.org/en/download/) (v14 or higher)

## Instructions

### 1. Install Dependencies
After Cloning the project, head inside the project folder and run
```
npm install
```

### 2.  DB Creation and Migrations
```
cp .env.example .env
```
Now, replace .env with your credentials and then run

``` 
npm run migrate:up
```
### 3. Starting the project
Make sure to have Port 3000 available for Express server and port 5423 for PostgreSQL server 
```
npm start
```

### 4. Running the tests
```
npm run test
```

Any by now you should be able to go to `localhost:5000` to test that everything is working as expected.
