"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _connection = require("./../database/connection");

var _Task = _interopRequireDefault(require("./Task"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var User = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(User, _Model);

  var _super = _createSuper(User);

  function User() {
    (0, _classCallCheck2["default"])(this, User);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(User, [{
    key: "comparePassword",
    value: function () {
      var _comparePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
        var match;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _bcrypt["default"].compare(password, this.password);

              case 2:
                match = _context.sent;
                return _context.abrupt("return", match);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function comparePassword(_x) {
        return _comparePassword.apply(this, arguments);
      }

      return comparePassword;
    }()
  }], [{
    key: "hashPassword",
    value: function () {
      var _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
        var hash;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _bcrypt["default"].hash(password, 10);

              case 2:
                hash = _context2.sent;
                return _context2.abrupt("return", hash);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function hashPassword(_x2) {
        return _hashPassword.apply(this, arguments);
      }

      return hashPassword;
    }()
  }]);
  return User;
}(_connection.Model);

User.init({
  username: {
    type: _connection.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: _connection.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _connection.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: _connection.DataTypes.STRING,
    defaultValue: "no-avatar.png"
  },
  type_user: {
    type: _connection.Sequelize.ENUM("admin", "operator"),
    allowNull: false
  }
}, {
  sequelize: _connection.sequelize,
  timestamps: true,
  modelName: "user",
  createdAt: "createdat",
  updatedAt: "updatedat"
}); // User.hasMany(Task, { as: "tasks" });

_Task["default"].belongsTo(User, {
  foreignKey: "assigned_to",
  as: "users"
});

var _default = User;
exports["default"] = _default;