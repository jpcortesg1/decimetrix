import { config } from "dotenv";

// Use dotenv variables
config();

const port = process.env.PORT || 4000;
const userDb = process.env.USER_DB || "";
const passwordDb = process.env.PASSWORD_DB || "";
const hostDb = process.env.HOST_DB || "";
const portDb = process.env.PORT_DB || "";
const nameDb = process.env.NAME_DB || "";
const secretKey = process.env.SECRET_KEY || "secretkey";
const databaseUrl = process.env.DATABASE_URL;

export default {
  port,
  userDb,
  passwordDb,
  hostDb,
  portDb,
  nameDb,
  secretKey,
  databaseUrl,
};
