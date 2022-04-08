"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataTypes", {
  enumerable: true,
  get: function get() {
    return _sequelize.DataTypes;
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _sequelize.Model;
  }
});
Object.defineProperty(exports, "Sequelize", {
  enumerable: true,
  get: function get() {
    return _sequelize.Sequelize;
  }
});
exports.sequelize = void 0;

var _config = _interopRequireDefault(require("../config"));

var _sequelize = require("sequelize");

var sequelize = new _sequelize.Sequelize(_config["default"].nameDb, _config["default"].userDb, _config["default"].passwordDb, {
  host: _config["default"].hostDb,
  dialect: "postgres"
});
exports.sequelize = sequelize;