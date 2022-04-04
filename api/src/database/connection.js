import { Pool } from "pg";

new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: "5432",
  database: "database",
});
