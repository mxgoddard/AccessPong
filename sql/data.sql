-- Run seed.sql before running this script

\c db_access_pong

-- Clear all tables in database
DELETE FROM tbl_user;
DELETE FROM tbl_league;
DELETE FROM tbl_fixture;
DELETE FROM tbl_leagueUserLink;


-- Create 3 users
INSERT INTO tbl_user
(firstName, lastName, email, pass)
VALUES 
('John', 'Smith', 'JohnSmith@gmail.com', 'poiuytrewq'),
('Ben', 'Foster', 'Ben.Foster@gmail.com', 'lkjhgfdsa'),
('Bob', 'Michaels', 'Bob.Michaels@yahoo.com', 'mnbvcxz');


-- Register league with those 3 users
INSERT INTO tbl_league
(leagueName, amountPeople, startDate)
VALUES
('Test League 1', 3, '05-08-2000');


-- Create the league user link table
INSERT INTO tbl_leagueUserLink
(leagueId, userId)
VALUES
('1', '1'),
('1', '2'),
('1', '3');


-- Generate fixtures for those 3 players
INSERT INTO tbl_fixture
(id, leagueId, matchNum, playerOneId, playerTwoId, winnerId)
VALUES
(1, 1, 1, 2, 3, -1),
(2, 1, 2, 1, 3, -1),
(3, 1, 3, 1, 2, -1);