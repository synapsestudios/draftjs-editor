"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OrderedList() {
  return _react2.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    },
    _react2.default.createElement("path", { d: "M6.559,5.023,9,12.242l2.428-7.219H14v9.953H12.035V12.256l.2-4.7L9.666,14.977H8.321L5.762,7.566l.2,4.689v2.721H4V5.023Z" }),
    _react2.default.createElement("polygon", { points: "15 1 15 2 3 2 3 1 1 1 1 5 3 5 3 4 15 4 15 5 17 5 17 1 15 1" })
  );
}

exports.default = OrderedList;