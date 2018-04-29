/* Create user almundo  */
CREATE ROLE almundo WITH LOGIN PASSWORD 'almundo2018*';

/*Create database */
CREATE DATABASE almundo;

/*Privileges on database */
GRANT ALL PRIVILEGES ON DATABASE almundo TO almundo;