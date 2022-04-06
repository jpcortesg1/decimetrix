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
// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully");
//     return sequelize;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const db = connect();
export { sequelize, DataTypes, Sequelize, Model };
