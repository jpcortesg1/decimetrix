/* Replace with your SQL commands */
CREATE TYPE types_user AS ENUM ('admin', 'operator');
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  image VARCHAR (255) NOT NULL,
  type_user types_user NOT NULL,
  created_on TIMESTAMP NOT NULL
);