'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _link = require('./decorators/link');

var _link2 = _interopRequireDefault(_link);

var _BlockStyleControls = require('./controls/BlockStyleControls');

var _BlockStyleControls2 = _interopRequireDefault(_BlockStyleControls);

var _InlineStyleControls = require('./controls/InlineStyleControls');

var _InlineStyleControls2 = _interopRequireDefault(_InlineStyleControls);

var _CustomBlockControls = require('./controls/CustomBlockControls');

var _CustomBlockControls2 = _interopRequireDefault(_CustomBlockControls);

var _controls = require('./controls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftJSEditor = function (_Component) {
  _inherits(DraftJSEditor, _Component);

  function DraftJSEditor(props) {
    _classCallCheck(this, DraftJSEditor);

    var _this = _possibleConstructorReturn(this, (DraftJSEditor.__proto__ || Object.getPrototypeOf(DraftJSEditor)).call(this, props));

    var decorators = props.decorators || [_link2.default];

    _this.decorator = new _draftJs.CompositeDecorator(decorators);

    var editorState = _draftJs.EditorState.createEmpty(_this.decorator);

    if (props.content) {
      editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(props.content), _this.decorator);
    }

    _this.state = {
      editorState: editorState,
      showUrlInput: false,
      urlValue: '',
      showCustomBlockInput: false,
      customBlockType: null,
      customBlockData: {}
    };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };

    _this.onChange = _this._onChange.bind(_this);
    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.toggleCustomBlockInput = function (nextState) {
      return _this._toggleCustomBlockInput(nextState);
    };

    _this.closeLinkPrompt = _this._closeLinkPrompt.bind(_this);
    _this.confirmLink = _this._confirmLink.bind(_this);
    _this.onLinkInputKeyDown = _this._onLinkInputKeyDown.bind(_this);
    _this.onUrlChange = function (e) {
      return _this.setState({ urlValue: e.target.value });
    };
    _this.promptForLink = _this._promptForLink.bind(_this);
    _this.removeLink = _this._removeLink.bind(_this);

    _this.confirmBlock = _this._confirmBlock.bind(_this);
    _this.onBlockInputKeyDown = _this._onBlockInputKeyDown.bind(_this);
    _this.onBlockDataChange = _this._onBlockDataChange.bind(_this);
    _this.renderBlock = _this._renderBlock.bind(_this, editorState.getCurrentContent());
    return _this;
  }

  _createClass(DraftJSEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var contentState = this.state.editorState.getCurrentContent();

      if (newProps.content && (!this.props.content || this.props.readOnly) && (!contentState.hasText() || this.props.readOnly)) {
        var editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(newProps.content), this.decorator);
        this.setState({ editorState: editorState });
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(editorState) {
      var _this2 = this;

      this.setState({ editorState: editorState }, function () {
        if (_this2.props.onChange) {
          var contentState = editorState.getCurrentContent();

          if (contentState.hasText()) {
            _this2.props.onChange((0, _draftJs.convertToRaw)(contentState));
          } else {
            _this2.props.onChange(null);
          }
        }
      });
    }
  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      if (inlineStyle === 'LINK') {
        if (!this.state.showUrlInput) {
          this.promptForLink();
        } else {
          this.removeLink();
        }
      } else {
        this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
      }
    }
  }, {
    key: '_closeLinkPrompt',
    value: function _closeLinkPrompt() {
      var _this3 = this;

      this.setState({
        showUrlInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {
          _this3.focus();
        }, 0);
      });
    }
  }, {
    key: '_confirmLink',
    value: function _confirmLink() {
      var _state = this.state,
          editorState = _state.editorState,
          urlValue = _state.urlValue;

      var contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
        target: this.props.linkTarget,
        url: urlValue
      });
      var entityKey = contentState.getLastCreatedEntityKey();

      this.onChange(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey));

      this.closeLinkPrompt();
    }
  }, {
    key: '_onLinkInputKeyDown',
    value: function _onLinkInputKeyDown(e) {
      if (e.which === 13) {
        this._confirmLink(e);
      }
    }
  }, {
    key: '_promptForLink',
    value: function _promptForLink() {
      var _this4 = this;

      var editorState = this.state.editorState;

      var selection = editorState.getSelection();

      if (!selection.isCollapsed()) {
        if (_draftJs.RichUtils.currentBlockContainsLink(editorState)) {
          this.removeLink();
        } else {
          this.setState({
            showUrlInput: true,
            urlValue: ''
          }, function () {
            setTimeout(function () {
              return _this4.refs.url.focus();
            }, 0);
          });
        }
      }
    }
  }, {
    key: '_removeLink',
    value: function _removeLink() {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();

      this.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
    }
  }, {
    key: '_confirmBlock',
    value: function _confirmBlock(data) {
      var _this5 = this;

      this.setState({
        customBlockData: {},
        customBlockType: null,
        editorState: this._insertCustomBlock(this.state.editorState, this.state.customBlockType, data || this.state.customBlockData),
        showCustomBlockInput: false
      }, function () {
        var contentState = _this5.state.editorState.getCurrentContent();
        _this5.props.onChange((0, _draftJs.convertToRaw)(contentState));
        setTimeout(function () {
          return _this5.focus();
        }, 0);
      });
    }
  }, {
    key: '_onBlockInputKeyDown',
    value: function _onBlockInputKeyDown(e) {
      if (e.which === 13) {
        this._confirmBlock();
      }
    }
  }, {
    key: '_onBlockDataChange',
    value: function _onBlockDataChange(customBlockData) {
      this.setState({ customBlockData: customBlockData });
    }
  }, {
    key: '_insertCustomBlock',
    value: function _insertCustomBlock(editorState, type, data) {
      var contentState = editorState.getCurrentContent().createEntity(type, 'IMMUTABLE', data);
      var entityKey = contentState.getLastCreatedEntityKey();

      return _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    }
  }, {
    key: '_toggleCustomBlockInput',
    value: function _toggleCustomBlockInput(nextState) {
      var _this6 = this;

      if (this.state.showCustomBlockInput && nextState.customBlockType === this.state.customBlockType) {
        this.setState({
          showCustomBlockInput: false,
          customBlockType: null,
          customBlockData: {}
        });
      } else {
        this.setState(nextState, function () {
          if (_this6.refs.customBlockInput) {
            _this6.refs.customBlockInput.focus();
          }
        });
      }
    }
  }, {
    key: '_renderBlock',
    value: function _renderBlock(contentState, block) {
      if (block.getType() === 'atomic') {
        var entityType = contentState.getEntity(block.getEntityAt(0)).getType();

        return this.props.customBlocks[entityType] ? this.props.customBlocks[entityType].getBlockRenderer() : null;
      }

      return null;
    }
  }, {
    key: 'renderControls',
    value: function renderControls() {
      var controls = [];

      if (this.props.blockControls) {
        controls.push(_react2.default.createElement(_BlockStyleControls2.default, {
          controls: this.props.blockControls,
          display: this.props.controlDisplay,
          key: 'block-controls',
          editorState: this.state.editorState,
          onToggle: this.toggleBlockType
        }));
      }

      if (this.props.inlineControls) {
        controls.push(_react2.default.createElement(_InlineStyleControls2.default, {
          controls: this.props.inlineControls,
          display: this.props.controlDisplay,
          key: 'inline-controls',
          editorState: this.state.editorState,
          onToggle: this.toggleInlineStyle
        }));
      }

      if (this.props.customBlockControls) {
        controls.push(_react2.default.createElement(_CustomBlockControls2.default, {
          customBlocks: this.props.customBlocks,
          customBlockType: this.state.customBlockType,
          controls: this.props.customBlockControls,
          display: this.props.controlDisplay,
          key: 'custom-block-controls',
          onClick: this.toggleCustomBlockInput
        }));
      }

      if (this.props.controlDisplay === 'inline') {
        return controls.reverse();
      }

      return controls;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'DraftJSEditor-editor';
      var contentState = this.state.editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' DraftJSEditor-hidePlaceholder';
        }
      }

      var urlInput = void 0;
      if (this.state.showUrlInput) {
        urlInput = _react2.default.createElement(
          'div',
          { className: 'DraftJSEditor-urlInput' },
          _react2.default.createElement('input', {
            className: 'DraftJSEditor-urlInputText',
            onChange: this.onUrlChange,
            ref: 'url',
            type: 'text',
            value: this.state.urlValue,
            onKeyDown: this.onLinkInputKeyDown
          }),
          _react2.default.createElement(
            'button',
            {
              className: 'DraftJSEditor-urlInputButton',
              onMouseDown: this.confirmLink
            },
            'Confirm'
          )
        );
      }

      var blockInput = void 0;
      if (this.state.showCustomBlockInput) {
        blockInput = this.props.customBlocks[this.state.customBlockType].renderInputForm.apply(this, [this.state.customBlockData, this.onBlockDataChange, this.onBlockInputKeyDown, this.confirmBlock]);
      }

      var _props = this.props,
          blockControls = _props.blockControls,
          content = _props.content,
          customBlockControls = _props.customBlockControls,
          customBlocks = _props.customBlocks,
          inlineControls = _props.inlineControls,
          controlDisplay = _props.controlDisplay,
          containerStyle = _props.containerStyle,
          passableProps = _objectWithoutProperties(_props, ['blockControls', 'content', 'customBlockControls', 'customBlocks', 'inlineControls', 'controlDisplay', 'containerStyle']);

      return _react2.default.createElement(
        'div',
        {
          className: 'DraftJSEditor-root',
          style: this.props.containerStyle
        },
        !this.props.readOnly ? this.renderControls() : null,
        !this.props.readOnly ? urlInput : null,
        !this.props.readOnly ? blockInput : null,
        _react2.default.createElement(
          'div',
          { className: className },
          _react2.default.createElement(_draftJs.Editor, _extends({}, passableProps, {
            blockRendererFn: this.renderBlock,
            editorState: this.state.editorState,
            handleKeyCommand: this.handleKeyCommand,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            readOnly: this.props.readOnly,
            ref: 'editor',
            spellCheck: this.props.spellCheck,
            stripPastedStyles: this.props.stripPastedStyles
          }))
        )
      );
    }
  }]);

  return DraftJSEditor;
}(_react.Component);

DraftJSEditor.propTypes = {
  blockControls: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  customBlockControls: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  content: _propTypes2.default.object,
  controlDisplay: _propTypes2.default.oneOf(['block', 'inline']),
  decorators: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    strategy: _propTypes2.default.object.isRequired,
    component: _propTypes2.default.object.isRequired
  })),
  inlineControls: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  linkTarget: _propTypes2.default.oneOf(['_blank', '_parent', '_self', '_top']),
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  customBlocks: _propTypes2.default.object,
  spellCheck: _propTypes2.default.bool,
  stripPastedStyles: _propTypes2.default.bool,
  containerStyle: _propTypes2.default.object,
  editorKey: _propTypes2.default.string,
  textAlignment: _propTypes2.default.string
};

DraftJSEditor.defaultProps = {
  blockControls: _controls.BLOCK_CONTROLS,
  controlDisplay: 'block',
  inlineControls: _controls.INLINE_CONTROLS,
  customBlockControls: [],
  customBlocks: {},
  linkTarget: '_blank',
  placeholder: '',
  readOnly: false,
  spellCheck: true,
  stripPastedStyles: false
};

exports.default = DraftJSEditor;