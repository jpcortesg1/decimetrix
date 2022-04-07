/* Replace with your SQL commands */

ALTER TABLE tasks
DROP COLUMN created_on;

ALTER TABLE tasks
ADD createdAt TIMESTAMP NOT NULL;

ALTER TABLE tasks
ADD updatedAt TIMESTAMP NOT NULL;