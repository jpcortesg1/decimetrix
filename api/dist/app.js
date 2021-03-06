"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _config = _interopRequireDefault(require("./config"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _tasks = _interopRequireDefault(require("./routes/tasks.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _path = _interopRequireDefault(require("path"));

// Required modules
// Create app
var app = (0, _express["default"])(); // Settings

app.set("port", _config["default"].port || 3000); // Middleware

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./src/upload"
}));
app.use("/images", _express["default"]["static"](_path["default"].join(__dirname, "/upload"))); // Routes

app.use(_auth["default"]);
app.use(_users["default"]);
app.use(_tasks["default"]);
var _default = app;
exports["default"] = _default;