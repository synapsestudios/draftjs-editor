'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Photo = require('../icons/Photo');

var _Photo2 = _interopRequireDefault(_Photo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getBlockRenderer: function getBlockRenderer() {
    return {
      component: function component(props) {
        var entity = props.contentState.getEntity(props.block.getEntityAt(0));
        var _entity$getData = entity.getData(),
            src = _entity$getData.src,
            alt = _entity$getData.alt;

        return _react2.default.createElement('img', { src: src, alt: alt });
      },
      editable: false
    };
  },
  getInitialData: function getInitialData() {
    return {
      src: '',
      alt: ''
    };
  },
  getLabel: function getLabel() {
    return 'Image';
  },
  getIcon: function getIcon() {
    return _react2.default.createElement(_Photo2.default, null);
  },
  renderHTML: function renderHTML(data) {
    return '<img src="' + data.src + '" alt="' + data.alt + '" />';
  },
  renderInputForm: function renderInputForm(data, onDataChange, onKeyDown, onSubmit) {
    var _this = this;

    var updateSrc = function updateSrc(e) {
      onDataChange({
        src: e.target.value,
        alt: data.alt
      });
    };

    var updateAlt = function updateAlt(e) {
      onDataChange({
        src: data.src,
        alt: e.target.value
      });
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        onChange: updateSrc,
        type: 'text',
        value: data.src,
        onKeyDown: onKeyDown,
        placeholder: 'URL',
        ref: function ref(c) {
          _this.refs.customBlockInput = c;
        }
      }),
      _react2.default.createElement('input', {
        onChange: updateAlt,
        type: 'text',
        value: data.alt,
        onKeyDown: onKeyDown,
        placeholder: 'Alt text'
      }),
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return onSubmit(data);
          } },
        'Confirm'
      )
    );
  }
};