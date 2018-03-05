'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('draft-js-export-html');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(customBlocks) {
    _classCallCheck(this, Renderer);

    this.customBlocks = customBlocks;

    this.convertRawToHTML = this.convertRawToHTML.bind(this);
  }

  _createClass(Renderer, [{
    key: 'convertRawToHTML',
    value: function convertRawToHTML(rawContent) {
      var _this = this;

      var entityMapIndex = 0;
      var options = {
        blockRenderers: {
          atomic: function atomic(block) {
            var entity = rawContent.entityMap[entityMapIndex];
            var data = entity.data;
            var type = entity.type;
            entityMapIndex += 1;

            return _this.customBlocks[type] ? _this.customBlocks[type].renderHTML(data) : null;
          }
        }
      };

      return (0, _draftJsExportHtml.stateToHTML)((0, _draftJs.convertFromRaw)(rawContent), options);
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;