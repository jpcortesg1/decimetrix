"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyTaskUser = exports.validateUpdateStatus = exports.validateCreateTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _Task = _interopRequireDefault(require("./../models/Task"));

var _User = _interopRequireDefault(require("./../models/User"));

var _helpers = require("./../helpers");

var checkStatus = (0, _expressValidator.check)("status").exists().notEmpty().custom(function (value, _ref) {
  var req = _ref.req;

  if (value !== "todo" && value !== "inprogress" && value !== "done") {
    throw new Error("Type of status no validate");
  }

  return true;
});
var validateCreateTask = [(0, _expressValidator.check)("message").exists().notEmpty(), checkStatus, (0, _expressValidator.check)("createdBy").exists().notEmpty().custom( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(value, _ref2) {
    var req, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref2.req;
            _context.next = 3;
            return _User["default"].findByPk(value);

          case 3:
            user = _context.sent;

            if (!(user && user.type_user === "admin")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", true);

          case 6:
            throw new Error("The actions is no valid");

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}()), (0, _expressValidator.check)("assignedTo").exists().notEmpty().custom( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(value, _ref4) {
    var req, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref4.req;
            _context2.next = 3;
            return _User["default"].findByPk(value);

          case 3:
            user = _context2.sent;

            if (!(user && user.type_user === "operator")) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", true);

          case 6:
            throw new Error("The actions is no valid");

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}()), function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      email = _req$body.email,
      typeUser = _req$body.typeUser;
  req.params = {
    username: username,
    password: password,
    email: email,
    type_user: typeUser
  };
  (0, _helpers.validateResult)(req, res, next);
}];
exports.validateCreateTask = validateCreateTask;
var validateUpdateStatus = [checkStatus, function (req, res, next) {
  (0, _helpers.validateResult)(req, res, next);
}];
exports.validateUpdateStatus = validateUpdateStatus;

var verifyTaskUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var bearerHeader, user, _req$user, idUser, typeUser, id, task;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            bearerHeader = req.headers["authorization"];
            user = (0, _helpers.isUser)(bearerHeader, req);

            if (!user) {
              _context3.next = 12;
              break;
            }

            _req$user = req.user, idUser = _req$user.id, typeUser = _req$user.typeUser;
            id = req.params.id;
            _context3.next = 8;
            return _Task["default"].findByPk(id);

          case 8:
            task = _context3.sent;

            if (!(task.assigned_to === idUser || typeUser === "admin")) {
              _context3.next = 12;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 12:
            throw new Error();

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(403).json([{
              value: req.headers["authorization"],
              msg: "you don't have the credentials",
              param: "token",
              location: "headers"
            }]));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));

  return function verifyTaskUser(_x5, _x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.verifyTaskUser = verifyTaskUser;