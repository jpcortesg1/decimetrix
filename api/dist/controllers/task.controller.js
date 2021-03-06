"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.getTasksUser = exports.getTasks = exports.deleteTask = exports.createTask = exports.changeStatus = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Task = _interopRequireDefault(require("./../models/Task"));

var getTasks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var tasks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Task["default"].findAll({
              include: ["users"]
            });

          case 3:
            tasks = _context.sent;
            res.status(200).json(tasks);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json(_context.t0.message));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getTasks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTasks = getTasks;

var getTasksUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, task;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Task["default"].findAll({
              where: {
                assigned_to: id
              },
              include: ["users"]
            });

          case 4:
            task = _context2.sent;
            res.status(200).json(task);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0.message));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getTasksUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTasksUser = getTasksUser;

var createTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, message, status, createdBy, assignedTo, params, newTask, task;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, message = _req$body.message, status = _req$body.status, createdBy = _req$body.createdBy, assignedTo = _req$body.assignedTo;
            params = {
              message: message,
              status: status,
              created_by: createdBy,
              assigned_to: assignedTo
            };
            newTask = _Task["default"].build(params);
            _context3.next = 6;
            return newTask.save();

          case 6:
            task = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(task));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0.message));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function createTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var updateTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, message, status, createdBy, assignedTo, params;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, message = _req$body2.message, status = _req$body2.status, createdBy = _req$body2.createdBy, assignedTo = _req$body2.assignedTo;
            params = {
              message: message,
              status: status,
              created_by: createdBy,
              assigned_to: assignedTo
            };
            _context4.next = 6;
            return _Task["default"].update(params, {
              where: {
                id: id
              }
            });

          case 6:
            return _context4.abrupt("return", res.status(200).json(params));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json(_context4.t0.message));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function updateTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateTask = updateTask;

var changeStatus = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, status;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            status = req.body.status;
            _context5.next = 5;
            return _Task["default"].update({
              status: status
            }, {
              where: {
                id: parseInt(id)
              },
              order: ["updatedat", "DESC"]
            });

          case 5:
            return _context5.abrupt("return", res.status(200).json("Task updated"));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json(_context5.t0.message));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function changeStatus(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var deleteTask = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _Task["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            return _context6.abrupt("return", res.status(200).json("Task deleted"));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json(_context6.t0.message));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function deleteTask(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteTask = deleteTask;