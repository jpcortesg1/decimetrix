import config from "../config";
import { Sequelize, DataTypes, Model } from "sequelize";

// Build
const sequelize = new Sequelize(config.databaseUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Dev
// const sequelize = new Sequelize(
//   config.nameDb,
//   config.userDb,
//   config.passwordDb,
//   {
//     host: config.hostDb,
//     dialect: "postgres",
//   }
// );

export { sequelize, DataTypes, Sequelize, Model };
