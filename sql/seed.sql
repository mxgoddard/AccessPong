-- Run this script before running data.sql

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
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL,
    wins INT DEFAULT 0,
    played INT DEFAULT 0
);

-- Create league table
DROP TABLE IF EXISTS tbl_league;
CREATE TABLE tbl_league
(
    id SERIAL PRIMARY KEY,
    leagueName VARCHAR(50) NOT NULL,
    amountPeople INT NOT NULL,
    startDate DATE NOT NULL
);

-- Create league user link table
DROP TABLE IF EXISTS tbl_leagueUserLink;
CREATE TABLE tbl_leagueUserLink
(
    leagueId INT NOT NULL,
    userId INT NOT NULL,
    points INT DEFAULT 0
);

-- Create fixtures table
DROP TABLE IF EXISTS tbl_fixture;
CREATE TABLE tbl_fixture
(
    id SERIAL PRIMARY KEY,
    leagueId INT NOT NULL,
    matchNum INT NOT NULL,
    playerOneId INT NOT NULL,
    playerTwoId INT NOT NULL,
    winnerId INT DEFAULT -1
);