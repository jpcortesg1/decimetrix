"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.isUser = exports.isAdmin = exports.currentUserOrAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./../config"));

var validateToken = function validateToken(bearer) {
  if (bearer) {
    var token = bearer.split(" ")[1];

    if (token) {
      var user = _jsonwebtoken["default"].verify(token, _config["default"].secretKey);

      return user;
    }
  }

  return false;
};

exports.validateToken = validateToken;

var isAdmin = function isAdmin(bearer) {
  var user = validateToken(bearer);
  if (user.typeUser === "admin") return true;
  return false;
};

exports.isAdmin = isAdmin;

var isUser = function isUser(bearer, req) {
  var user = validateToken(bearer);

  if (user.typeUser === "admin" || user.typeUser === "operator") {
    req.user = user;
    return true;
  }

  return false;
};

exports.isUser = isUser;

var currentUserOrAdmin = function currentUserOrAdmin(bearer, req) {
  var user = validateToken(bearer);

  if (user.typeUser === "admin" || user.id == req.params.id) {
    return true;
  }

  return false;
};

exports.currentUserOrAdmin = currentUserOrAdmin;