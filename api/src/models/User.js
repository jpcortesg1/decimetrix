import {
  sequelize,
  DataTypes,
  Sequelize,
  Model,
} from "./../database/connection";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "no-avatar.png",
    },
    type_user: {
      type: Sequelize.ENUM("admin", "operator", "done"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "user",
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

export default User;
