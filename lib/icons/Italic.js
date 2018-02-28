"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Italic() {
  return _react2.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    },
    _react2.default.createElement("path", { d: "M7 2v2h2.58l-3.66 8H3v2h8v-2H8.42l3.66-8H15V2z" })
  );
}

exports.default = Italic;