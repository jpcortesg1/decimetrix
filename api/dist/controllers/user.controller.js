"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putUser = exports.getUsersOperators = exports.getUsers = exports.getUser = exports.deleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("./../models/User"));

var _fs = _interopRequireDefault(require("fs"));

var getUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findAll();

          case 3:
            users = _context.sent;
            res.status(200).json(users);
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

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUsersOperators = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findAll({
              where: {
                type_user: "operator"
              }
            });

          case 3:
            users = _context2.sent;
            res.status(200).json(users);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0.message));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getUsersOperators(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsersOperators = getUsersOperators;

var getUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return _User["default"].findOne({
              where: {
                id: id
              }
            });

          case 4:
            user = _context3.sent;
            res.status(200).json(user);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0.message));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var putUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, photo, files, _req$body, username, email, password, paramsUpdate;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;

            if (req.files) {
              files = req.files;
              photo = files.photo;
            }

            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
            paramsUpdate = {
              username: username,
              email: email
            };

            if (photo) {
              console.log(photo);
              paramsUpdate.image = "".concat(photo.tempFilePath).concat(photo.name);

              _fs["default"].renameSync(photo.tempFilePath, "".concat(photo.tempFilePath).concat(photo.name));
            }

            if (!password) {
              _context4.next = 10;
              break;
            }

            _context4.next = 9;
            return _User["default"].hashPassword(password);

          case 9:
            paramsUpdate.password = _context4.sent;

          case 10:
            _context4.next = 12;
            return _User["default"].update(paramsUpdate, {
              where: {
                id: id
              }
            });

          case 12:
            return _context4.abrupt("return", res.status(200).json(paramsUpdate));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json(_context4.t0.message));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function putUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.putUser = putUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _User["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            return _context5.abrupt("return", res.status(200).json("User deleted"));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json(_context5.t0.message));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;