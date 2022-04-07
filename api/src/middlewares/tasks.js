import { check } from "express-validator";
import Task from "./../models/Task";
import User from "./../models/User";
import { validateResult } from "./../helpers";

export const validateCreateTask = [
  check("message").exists().notEmpty(),
  check("status")
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== "todo" && value !== "inprogress" && value !== "done") {
        throw new Error("Type of status no validate");
      }
      return true;
    }),
  check("createdBy")
    .exists()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findByPk(value);
      if (user && user.type_user === "admin") {
        return true;
      }
      throw new Error("The actions is no valid");
    }),
  check("assignedTo")
    .exists()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findByPk(value);
      if (user && user.type_user === "operator") {
        return true;
      }
      throw new Error("The actions is no valid");
    }),
  (req, res, next) => {
    const { username, password, email, typeUser } = req.body;
    req.params = { username, password, email, type_user: typeUser };
    validateResult(req, res, next);
  },
];
