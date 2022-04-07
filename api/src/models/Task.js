import {
  sequelize,
  DataTypes,
  Sequelize,
  Model,
} from "./../database/connection";

class Task extends Model {}

Task.init(
  {
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("todo", "inprogress", "done"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "task",
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

export default Task;
