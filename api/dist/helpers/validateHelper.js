"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateResult = void 0;

var _expressValidator = require("express-validator");

var validateResult = function validateResult(req, res, next) {
  try {
    (0, _expressValidator.validationResult)(req)["throw"]();
    return next();
  } catch (error) {
    res.status(403).json({
      errors: error.array()
    });
  }
};

exports.validateResult = validateResult;