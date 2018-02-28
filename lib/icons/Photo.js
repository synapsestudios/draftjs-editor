"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Photo() {
  return _react2.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    },
    _react2.default.createElement("path", { d: "M16.5,12V3A1.5,1.5,0,0,0,15,1.5H6A1.5,1.5,0,0,0,4.5,3v9A1.5,1.5,0,0,0,6,13.5h9A1.5,1.5,0,0,0,16.5,12ZM8.25,9l1.522,2.033L12,8.25,15,12H6ZM1.5,4.5V15A1.5,1.5,0,0,0,3,16.5H13.5V15H3V4.5Z" })
  );
}

exports.default = Photo;