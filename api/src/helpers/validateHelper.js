import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    const { username, password, email, typeUser } = req.body;
    req.body.newUser = { username, password, email, type_user: typeUser };
    return next();
  } catch (error) {
    res.status(403).json({ errors: error.array() });
  }
};

export default validateResult;
