import jwt from "jsonwebtoken";
import config from "./../config";

const validateToken = (bearer) => {
  if (bearer) {
    const token = bearer.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, config.secretKey);
      return user;
    }
  }
  return false;
};

export const isAdmin = (bearer) => {
  const user = validateToken(bearer);
  if (user.typeUser === "admin") return true;
  return false;
};
