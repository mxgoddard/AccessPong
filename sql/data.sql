-- Run seed.sql before running this script

\c db_access_pong

-- Clear user table
DELETE FROM tbl_user;

-- Create 3 users
INSERT INTO tbl_user
(firstName, lastName, email, pass)
VALUES 
('John', 'Smith', 'JohnSmith@gmail.com', 'poiuytrewq'),
('Ben', 'Foster', 'Ben.Foster@gmail.com', 'lkjhgfdsa'),
('Bob', 'Michaels', 'Bob.Michaels@yahoo.com', 'mnbvcxz');

-- Clear league table
DELETE FROM tbl_league;

-- Register league with those 3 users
INSERT INTO tbl_league
(leagueName, amountPeople, startDate)
VALUES
('Test League 1', 3, '05-08-2000');

INSERT INTO tbl_leagueUserLink
(leagueId, userId)
VALUES
('1', '1'),
('1', '2'),
('1', '3');