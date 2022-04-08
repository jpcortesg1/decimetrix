"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserOrAdmin = exports.verifyUser = exports.validateUpdate = exports.validateLogin = exports.validateCreateUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _helpers = require("./../helpers");

var _User = _interopRequireDefault(require("./../models/User"));

var checkUsername = (0, _expressValidator.check)("username").exists().notEmpty().isLength({
  min: 3,
  max: 50
}).withMessage("The username must have 5 characters minimum up to 50");
var checkPassword = (0, _expressValidator.check)("password").exists().notEmpty().isLength({
  min: 5,
  max: 50
}).withMessage("The password must have 5 characters minimum up to 50");
var userExist = (0, _expressValidator.check)("username").custom( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(value, _ref) {
    var req, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            _context.next = 3;
            return _User["default"].findOne({
              where: {
                username: value
              }
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            throw new Error("The user is already exist");

          case 6:
            return _context.abrupt("return", true);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
var userNotExist = (0, _expressValidator.check)("username").custom( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(value, _ref3) {
    var req, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref3.req;
            _context2.next = 3;
            return _User["default"].findOne({
              where: {
                username: value
              }
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            throw new Error("The user does exist");

          case 6:
            req.user = user;
            return _context2.abrupt("return", true);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}());
var validateCreateUser = [checkUsername, userExist, checkPassword, (0, _expressValidator.check)("email").exists().notEmpty().isEmail().custom( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(value, _ref5) {
    var req, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = _ref5.req;
            _context3.next = 3;
            return _User["default"].findOne({
              where: {
                email: value
              }
            });

          case 3:
            user = _context3.sent;

            if (!user) {
              _context3.next = 6;
              break;
            }

            throw new Error("The user is already exist");

          case 6:
            return _context3.abrupt("return", true);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}()), (0, _expressValidator.check)("typeUser").exists().notEmpty().custom(function (value, _ref7) {
  var req = _ref7.req;

  if (value !== "admin" && value !== "operator") {
    throw new Error("Type of user no validate");
  }

  return true;
}), function (req, res, next) {
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
exports.validateCreateUser = validateCreateUser;
var validateLogin = [checkUsername, userNotExist, checkPassword, function (req, res, next) {
  (0, _helpers.validateResult)(req, res, next);
}];
exports.validateLogin = validateLogin;
var validateUpdate = [checkUsername, (0, _expressValidator.check)("password").optional().notEmpty().isLength({
  min: 5,
  max: 50
}).withMessage("The password must have 5 characters minimum up to 50"), (0, _expressValidator.check)("photo").optional().notEmpty(), (0, _expressValidator.check)("email").exists().notEmpty().isEmail(), function (req, res, next) {
  (0, _helpers.validateResult)(req, res, next);
}];
exports.validateUpdate = validateUpdate;

var verifyUser = function verifyUser(req, res, next) {
  try {
    var bearerHeader = req.headers["authorization"];
    var user = (0, _helpers.isUser)(bearerHeader, req);

    if (user) {
      next();
      return;
    }
  } catch (error) {
    return res.status(403).json([{
      value: req.headers["authorization"],
      msg: "you don't have the credentials",
      param: "token",
      location: "headers"
    }]);
  }
};

exports.verifyUser = verifyUser;

var verifyUserOrAdmin = function verifyUserOrAdmin(req, res, next) {
  try {
    var bearerHeader = req.headers["authorization"];
    var user = (0, _helpers.currentUserOrAdmin)(bearerHeader, req);

    if (user) {
      next();
      return;
    }

    throw new Error();
  } catch (error) {
    return res.status(403).json([{
      value: req.headers["authorization"],
      msg: "you don't have the credentials",
      param: "token",
      location: "headers"
    }]);
  }
};

exports.verifyUserOrAdmin = verifyUserOrAdmin;