import config from "../config";
import { Pool } from "pg";

const pool = new Pool({
  user: config.userDb,
  password: config.passwordDb,
  host: config.hostDb,
  port: config.portDb,
  database: config.nameDb,
});

module.exports = pool;
