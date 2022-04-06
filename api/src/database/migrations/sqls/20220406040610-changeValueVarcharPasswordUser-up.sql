/* Replace with your SQL commands */
ALTER TABLE users
DROP COLUMN password;

ALTER TABLE users
ADD password VARCHAR(100) NOT NULL;