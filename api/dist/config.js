"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

// Use dotenv variables
(0, _dotenv.config)();
var port = process.env.PORT || 4000;
var userDb = process.env.USER_DB || "";
var passwordDb = process.env.PASSWORD_DB || "";
var hostDb = process.env.HOST_DB || "";
var portDb = process.env.PORT_DB || "";
var nameDb = process.env.NAME_DB || "";
var secretKey = process.env.SECRET_KEY || "secretkey";
var _default = {
  port: port,
  userDb: userDb,
  passwordDb: passwordDb,
  hostDb: hostDb,
  portDb: portDb,
  nameDb: nameDb,
  secretKey: secretKey
};
exports["default"] = _default;