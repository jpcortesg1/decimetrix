import { isAdmin } from "./../helpers/verifyTokenHerlpers";

export const verifyAdmin = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const admin = isAdmin(bearerHeader);
    console.log(admin);
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
