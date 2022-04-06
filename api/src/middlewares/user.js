import { check } from "express-validator";
import { validateResult, isUser, currentUserOrAdmin } from "./../helpers";
import User from "./../models/User";

const checkUsername = check("username")
  .exists()
  .notEmpty()
  .isLength({ min: 3, max: 50 })
  .withMessage("The username must have 5 characters minimum up to 50");

const checkPassword = check("password")
  .exists()
  .notEmpty()
  .isLength({ min: 5, max: 50 })
  .withMessage("The password must have 5 characters minimum up to 50");

const userExist = check("username").custom(async (value, { req }) => {
  const user = await User.findOne({
    where: { username: value },
  });
  if (user) {
    throw new Error("The user is already exist");
  }
  return true;
});

const userNotExist = check("username").custom(async (value, { req }) => {
  const user = await User.findOne({
    where: { username: value },
  });
  if (!user) {
    throw new Error("The user does exist");
  }
  req.user = user;
  return true;
});

export const validateCreateUser = [
  checkUsername,
  userExist,
  checkPassword,
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        where: { email: value },
      });
      if (user) {
        throw new Error("The user is already exist");
      }
      return true;
    }),
  check("typeUser")
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== "admin" && value !== "operator") {
        throw new Error("Type of user no validate");
      }
      return true;
    }),
  (req, res, next) => {
    const { username, password, email, typeUser } = req.body;
    req.params = { username, password, email, type_user: typeUser };
    validateResult(req, res, next);
  },
];

export const validateLogin = [
  checkUsername,
  userNotExist,
  checkPassword,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const verifyUser = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const user = isUser(bearerHeader, req);
    if (user) {
      next();
      return;
    }
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

export const verifyUserOrAdmin = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const user = currentUserOrAdmin(bearerHeader, req);
    if (user) {
      next();
      return;
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
