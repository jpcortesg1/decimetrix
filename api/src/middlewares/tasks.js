import { check } from "express-validator";
import Task from "./../models/Task";
import User from "./../models/User";
import { validateResult, isUser, validateToken } from "./../helpers";

const checkStatus = check("status")
  .exists()
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== "todo" && value !== "inprogress" && value !== "done") {
      throw new Error("Type of status no validate");
    }
    return true;
  });

export const validateCreateTask = [
  check("message").exists().notEmpty(),
  checkStatus,
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

export const validateUpdateStatus = [
  checkStatus,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const verifyTaskUser = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const user = isUser(bearerHeader, req);
    if (user) {
      const { id: idUser } = req.user;
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (task.assigned_to === idUser) {
        next();
        return;
      }
    }
    throw new Error();
  } catch (error) {
    return res.status(403).json([
      {
        value: req.headers["authorization"],
        msg: "you don't have the credentials",
        param: "token",
        location: "headers",
      },
    ]);
  }
};
