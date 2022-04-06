import config from "../config";
import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(
  config.nameDb,
  config.userDb,
  config.passwordDb,
  {
    host: config.hostDb,
    dialect: "postgres",
  }
);

export { sequelize, DataTypes, Sequelize, Model };
