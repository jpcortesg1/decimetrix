"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("./../middlewares");

var _user = require("./../controllers/user.controller");

var router = (0, _express.Router)();
router.get("/users", _middlewares.verifyAdmin, _user.getUsers);
router.get("/users/operators", _middlewares.verifyAdmin, _user.getUsersOperators);
router.get("/users/:id", _middlewares.verifyUserOrAdmin, _user.getUser);
router.put("/users/:id", _middlewares.verifyUserOrAdmin, _middlewares.validateUpdate, _user.putUser);
router["delete"]("/users/:id", _middlewares.verifyUserOrAdmin, _user.deleteUser);
var _default = router;
exports["default"] = _default;