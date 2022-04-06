import User from "./../models/User";
import jwt from "jsonwebtoken";
import config from "./../config";

export const createUser = async (req, res) => {
  try {
    const { params } = req;
    const newUser = User.build(params);
    await newUser.hashPassword();
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { user } = req;
    const response = await user.comparePassword(req.body.password);
    if (!response) {
      return res.status(403).json([
        {
          value: req.body.password,
          msg: "The user does exist",
          param: "password",
          location: "body",
        },
      ]);
    }
    const token = jwt.sign(
      { id: user.id, typeUser: user.type_user },
      config.secretKey
    );
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
