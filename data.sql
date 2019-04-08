DROP DATABASE IF EXISTS db_access_pong;
CREATE DATABASE db_access_pong;

\c db_access_pong

-- Create user table
DROP TABLE IF EXISTS tbl_user;
CREATE TABLE tbl_user 
(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);