import { isAdmin } from "./../helpers";

export const verifyAdmin = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const admin = isAdmin(bearerHeader);
    if (admin) {
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
