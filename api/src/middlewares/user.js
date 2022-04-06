import { check } from "express-validator";
import validateResult from "./../helpers/validateHelper";

const validateCreate = [
  check("username")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage("The username must have 5 characters minimum up to 50"),
  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 50 })
    .withMessage("The password must have 5 characters minimum up to 50"),
  check("email").exists().notEmpty().isEmail(),
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
    validateResult(req, res, next);
  },
];

export default validateCreate;
