import jwt from "jsonwebtoken";
import config from "./../config";

export const verifyAdmin = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      if (token) {
        const user = jwt.verify(token, config.secretKey);
        if (user.typeUser === "admin") {
          next();
          return;
        }
      }
    }
    return res.status(403).json([
      {
        value: req.headers["authorization"],
        msg: "you don't have the credentials",
        param: "token",
        location: "headers",
      },
    ]);
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
