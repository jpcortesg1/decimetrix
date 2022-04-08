"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _connection = require("./../database/connection");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Task = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Task, _Model);

  var _super = _createSuper(Task);

  function Task() {
    (0, _classCallCheck2["default"])(this, Task);
    return _super.apply(this, arguments);
  }

  return (0, _createClass2["default"])(Task);
}(_connection.Model);

Task.init({
  created_by: {
    type: _connection.DataTypes.INTEGER,
    allowNull: false
  },
  assigned_to: {
    type: _connection.DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: _connection.DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: _connection.Sequelize.ENUM("todo", "inprogress", "done"),
    allowNull: false
  }
}, {
  sequelize: _connection.sequelize,
  timestamps: true,
  modelName: "task",
  createdAt: "createdat",
  updatedAt: "updatedat"
});
var _default = Task;
exports["default"] = _default;