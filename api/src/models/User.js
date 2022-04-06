import bcrypt from "bcrypt";
import {
  sequelize,
  DataTypes,
  Sequelize,
  Model,
} from "./../database/connection";

class User extends Model {
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "no-avatar.png",
    },
    type_user: {
      type: Sequelize.ENUM("admin", "operator"),
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
