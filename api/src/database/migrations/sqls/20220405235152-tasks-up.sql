/* Replace with your SQL commands */
CREATE TYPE status_task AS ENUM ('todo', 'inprogress', 'done');

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  created_by INT NOT NULL,
  assigned_to INT NOT NULL,
  message TEXT NOT NULL,
  status status_task NOT NULL,
  created_on TIMESTAMP NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users (id),
  FOREIGN KEY (assigned_to) REFERENCES users (id)
);