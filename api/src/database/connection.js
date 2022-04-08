import config from "../config";
import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(config.databaseUrl);

export { sequelize, DataTypes, Sequelize, Model };
