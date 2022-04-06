/* Replace with your SQL commands */

ALTER TABLE users
DROP COLUMN created_on;

ALTER TABLE users
ADD createdAt TIMESTAMP NOT NULL;

ALTER TABLE users
ADD updatedAt TIMESTAMP NOT NULL;