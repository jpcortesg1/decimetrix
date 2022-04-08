"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("./../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./../config"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var params, newUser, hash, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            params = req.params;
            newUser = _User["default"].build(params);
            _context.next = 5;
            return _User["default"].hashPassword(newUser.password);

          case 5:
            hash = _context.sent;
            newUser.password = hash;
            _context.next = 9;
            return newUser.save();

          case 9:
            user = _context.sent;
            return _context.abrupt("return", res.status(200).json(user));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json(_context.t0.message));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, response, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = req.user;
            _context2.next = 4;
            return user.comparePassword(req.body.password);

          case 4:
            response = _context2.sent;

            if (response) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              errors: [{
                value: req.body.password,
                msg: "Incorrect password",
                param: "password",
                location: "body"
              }]
            }));

          case 7:
            token = _jsonwebtoken["default"].sign({
              id: user.id,
              typeUser: user.type_user
            }, _config["default"].secretKey);
            return _context2.abrupt("return", res.status(200).json(token));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0.message));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;