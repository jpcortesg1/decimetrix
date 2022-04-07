import jwt from "jsonwebtoken";
import config from "./../config";

export const validateToken = (bearer) => {
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

export const isUser = (bearer, req) => {
  const user = validateToken(bearer);
  if (user.typeUser === "admin" || user.typeUser === "operator") {
    req.user = user;
    return true;
  }
  return false;
};

export const currentUserOrAdmin = (bearer, req) => {
  const user = validateToken(bearer);
  if (user.typeUser === "admin" || user.id == req.params.id) {
    return true;
  }
  return false;
};
