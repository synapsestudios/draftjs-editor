'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = exports.convertToRaw = exports.convertFromRaw = exports.defaultBlocks = exports.Renderer = exports.DraftJSEditor = undefined;

var _DraftJSEditor = require('./DraftJSEditor');

var _DraftJSEditor2 = _interopRequireDefault(_DraftJSEditor);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _img = require('./blocks/img');

var _img2 = _interopRequireDefault(_img);

var _video = require('./blocks/video');

var _video2 = _interopRequireDefault(_video);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultBlocks = {
  IMG: _img2.default,
  VIDEO: _video2.default
};

exports.default = _DraftJSEditor2.default;
exports.DraftJSEditor = _DraftJSEditor2.default;
exports.Renderer = _renderer2.default;
exports.defaultBlocks = defaultBlocks;
exports.convertFromRaw = _draftJs.convertFromRaw;
exports.convertToRaw = _draftJs.convertToRaw;
exports.Entity = _draftJs.Entity;