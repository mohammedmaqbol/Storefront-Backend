CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR UNIQUE NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password  VARCHAR  NOT NULL
);