/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import linkDecorator from './decorators/link';

import BlockStyleControls from './controls/BlockStyleControls';
import InlineStyleControls from './controls/InlineStyleControls';
import CustomBlockControls from './controls/CustomBlockControls';

import { BLOCK_CONTROLS, INLINE_CONTROLS } from './controls';

class DraftJSEditor extends Component {
  constructor(props) {
    super(props);

    const decorators = props.decorators || [linkDecorator];

    this.decorator = new CompositeDecorator(decorators);

    let editorState = EditorState.createEmpty(this.decorator);

    if (props.content) {
      editorState = EditorState.createWithContent(
        convertFromRaw(props.content),
        this.decorator
      );
    }

    this.state = {
      editorState,
      showUrlInput: false,
      urlValue: '',
      showCustomBlockInput: false,
      customBlockType: null,
      customBlockData: {},
    };

    this.focus = () => this.refs.editor.focus();

    this.onChange = this._onChange.bind(this);
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.toggleCustomBlockInput = nextState =>
      this._toggleCustomBlockInput(nextState);

    this.closeLinkPrompt = this._closeLinkPrompt.bind(this);
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.onUrlChange = e => this.setState({ urlValue: e.target.value });
    this.promptForLink = this._promptForLink.bind(this);
    this.removeLink = this._removeLink.bind(this);

    this.confirmBlock = this._confirmBlock.bind(this);
    this.onBlockInputKeyDown = this._onBlockInputKeyDown.bind(this);
    this.onBlockDataChange = this._onBlockDataChange.bind(this);
    this.renderBlock = this._renderBlock.bind(this, editorState.getCurrentContent());
  }

  componentWillReceiveProps(newProps) {
    const contentState = this.state.editorState.getCurrentContent();

    if (
      newProps.content &&
      (!this.props.content || this.props.readOnly) &&
      (!contentState.hasText() || this.props.readOnly)
    ) {
      const editorState = EditorState.createWithContent(
        convertFromRaw(newProps.content),
        this.decorator
      );
      this.setState({ editorState });
    }
  }

  _onChange(editorState) {
    this.setState({ editorState }, () => {
      if (this.props.onChange) {
        const contentState = editorState.getCurrentContent();

        if (contentState.hasText()) {
          this.props.onChange(convertToRaw(contentState));
        } else {
          this.props.onChange(null);
        }
      }
    });
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    if (inlineStyle === 'LINK') {
      if (!this.state.showUrlInput) {
        this.promptForLink();
      } else {
        this.removeLink();
      }
    } else {
      this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
      );
    }
  }

  // Link handling
  _closeLinkPrompt() {
    this.setState(
      {
        showUrlInput: false,
        urlValue: '',
      },
      () => {
        setTimeout(() => {
          this.focus();
        }, 0);
      }
    );
  }

  _confirmLink() {
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
      target: this.props.linkTarget,
      url: urlValue,
    });
    const entityKey = contentState.getLastCreatedEntityKey();

    this.onChange(
      RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
    );

    this.closeLinkPrompt();
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _promptForLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      if (RichUtils.currentBlockContainsLink(editorState)) {
        this.removeLink();
      } else {
        this.setState(
          {
            showUrlInput: true,
            urlValue: '',
          },
          () => {
            setTimeout(() => this.refs.url.focus(), 0);
          }
        );
      }
    }
  }

  _removeLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    this.onChange(RichUtils.toggleLink(editorState, selection, null));
  }

  _confirmBlock(data) {
    this.setState(
      {
        customBlockData: {},
        customBlockType: null,
        editorState: this._insertCustomBlock(
          this.state.editorState,
          this.state.customBlockType,
          data || this.state.customBlockData
        ),
        showCustomBlockInput: false,
      },
      () => {
        const contentState = this.state.editorState.getCurrentContent();
        this.props.onChange(convertToRaw(contentState));
        setTimeout(() => this.focus(), 0);
      }
    );
  }

  _onBlockInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmBlock();
    }
  }

  _onBlockDataChange(customBlockData) {
    this.setState({ customBlockData });
  }

  _insertCustomBlock(editorState, type, data) {
    const contentState = editorState.getCurrentContent().createEntity(type, 'IMMUTABLE', data);
    const entityKey = contentState.getLastCreatedEntityKey();

    // if you use an empty string for the block content here Draft will die
    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  }

  _toggleCustomBlockInput(nextState) {
    if (
      this.state.showCustomBlockInput &&
      nextState.customBlockType === this.state.customBlockType
    ) {
      this.setState({
        showCustomBlockInput: false,
        customBlockType: null,
        customBlockData: {},
      });
    } else {
      this.setState(nextState, () => {
        if (this.refs.customBlockInput) {
          this.refs.customBlockInput.focus();
        }
      });
    }
  }

  _renderBlock(contentState, block) {
    if (block.getType() === 'atomic') {
      const entityType = contentState.getEntity(block.getEntityAt(0)).getType();

      return this.props.customBlocks[entityType]
        ? this.props.customBlocks[entityType].getBlockRenderer()
        : null;
    }

    // fall back to default renderer
    return null;
  }

  renderControls() {
    const controls = [];

    if (this.props.blockControls) {
      controls.push(
        <BlockStyleControls
          controls={this.props.blockControls}
          display={this.props.controlDisplay}
          key="block-controls"
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
      );
    }

    if (this.props.inlineControls) {
      controls.push(
        <InlineStyleControls
          controls={this.props.inlineControls}
          display={this.props.controlDisplay}
          key="inline-controls"
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
      );
    }

    if (this.props.customBlockControls) {
      controls.push(
        <CustomBlockControls
          customBlocks={this.props.customBlocks}
          customBlockType={this.state.customBlockType}
          controls={this.props.customBlockControls}
          display={this.props.controlDisplay}
          key="custom-block-controls"
          onClick={this.toggleCustomBlockInput}
        />
      );
    }

    if (this.props.controlDisplay === 'inline') {
      return controls.reverse();
    }

    return controls;
  }

  render() {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'DraftJSEditor-editor';
    const contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' DraftJSEditor-hidePlaceholder';
      }
    }

    let urlInput;
    if (this.state.showUrlInput) {
      urlInput = (
        <div className="DraftJSEditor-urlInput">
          <input
            className="DraftJSEditor-urlInputText"
            onChange={this.onUrlChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button
            className="DraftJSEditor-urlInputButton"
            onMouseDown={this.confirmLink}
          >
            Confirm
          </button>
        </div>
      );
    }

    let blockInput;
    if (this.state.showCustomBlockInput) {
      blockInput = this.props.customBlocks[
        this.state.customBlockType
      ].renderInputForm.apply(this, [
        this.state.customBlockData,
        this.onBlockDataChange,
        this.onBlockInputKeyDown,
        this.confirmBlock,
      ]);
    }

    const {
      blockControls,
      content,
      customBlockControls,
      customBlocks,
      inlineControls,
      controlDisplay,
      containerStyle,
      ...passableProps,
    } = this.props;

    return (
      <div
        className="DraftJSEditor-root"
        style={this.props.containerStyle}
      >
        {!this.props.readOnly ? this.renderControls() : null}
        {!this.props.readOnly ? urlInput : null}
        {!this.props.readOnly ? blockInput : null}
        <div className={className}>
          <Editor
            {...passableProps}
            blockRendererFn={this.renderBlock}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref="editor"
            spellCheck={this.props.spellCheck}
            stripPastedStyles={this.props.stripPastedStyles}
          />
        </div>
      </div>
    );
  }
}

DraftJSEditor.propTypes = {
  blockControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  customBlockControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  content: PropTypes.object,
  controlDisplay: PropTypes.oneOf(['block', 'inline']),
  decorators: PropTypes.arrayOf(PropTypes.shape({
    strategy: PropTypes.object.isRequired,
    component: PropTypes.object.isRequired,
  })),
  inlineControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  linkTarget: PropTypes.oneOf(['_blank', '_parent', '_self', '_top']),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  customBlocks: PropTypes.object,
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  containerStyle: PropTypes.object,
  editorKey: PropTypes.string,
  textAlignment: PropTypes.string,
};

DraftJSEditor.defaultProps = {
  blockControls: BLOCK_CONTROLS,
  controlDisplay: 'block',
  inlineControls: INLINE_CONTROLS,
  customBlockControls: [],
  customBlocks: {},
  linkTarget: '_blank',
  placeholder: '',
  readOnly: false,
  spellCheck: true,
  stripPastedStyles: false,
};

export default DraftJSEditor;
