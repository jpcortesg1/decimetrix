"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var _task = require("./../controllers/task.controller");

var router = (0, _express.Router)();
router.get("/tasks", _middlewares.verifyAdmin, _task.getTasks);
router.get("/tasks/:id", _middlewares.verifyUserOrAdmin, _task.getTasksUser);
router.post("/tasks", _middlewares.verifyAdmin, _middlewares.validateCreateTask, _task.createTask);
router.put("/tasks/:id", _middlewares.verifyUserOrAdmin, _middlewares.validateCreateTask, _task.updateTask);
router.put("/tasks/status/:id", _middlewares.verifyTaskUser, _middlewares.validateUpdateStatus, _task.changeStatus);
router["delete"]("/tasks/:id", _middlewares.verifyAdmin, _task.deleteTask);
var _default = router;
exports["default"] = _default;