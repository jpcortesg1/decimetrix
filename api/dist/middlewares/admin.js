"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAdmin = void 0;

var _helpers = require("./../helpers");

var verifyAdmin = function verifyAdmin(req, res, next) {
  try {
    var bearerHeader = req.headers["authorization"];
    var admin = (0, _helpers.isAdmin)(bearerHeader);

    if (admin) {
      next();
      return;
    }

    throw new Error();
  } catch (error) {
    return res.status(403).json({
      errors: [{
        value: req.headers["authorization"],
        msg: "you don't have the credentials",
        param: "token",
        location: "headers"
      }]
    });
  }
};

exports.verifyAdmin = verifyAdmin;