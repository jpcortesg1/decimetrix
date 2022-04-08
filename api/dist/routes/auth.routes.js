"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("./../controllers/auth.controller");

var _middlewares = require("./../middlewares");

var router = (0, _express.Router)();
router.post("/auth/register", _middlewares.verifyAdmin, _middlewares.validateCreateUser, _auth.createUser);
router.post("/auth/login", _middlewares.validateLogin, _auth.login);
var _default = router;
exports["default"] = _default;