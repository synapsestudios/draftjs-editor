/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  Editor,
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js';

import linkDecorator from './decorators/link';

import BlockStyleControls from './controls/BlockStyleControls';
import InlineStyleControls from './controls/InlineStyleControls';
import CustomBlockControls from './controls/CustomBlockControls';

import { BLOCK_CONTROLS, INLINE_CONTROLS } from './controls';

import renderers from './renderers';

class DraftJSEditor extends Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      linkDecorator,
    ]);

    let editorState = EditorState.createEmpty(decorator);

    if (props.content) {
      editorState = EditorState.createWithContent(convertFromRaw(props.content), decorator);
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
    this.toggleCustomBlockInput = nextState => this._toggleCustomBlockInput(nextState);

    this.confirmUrl = this._confirmUrl.bind(this);
    this.onUrlInputKeyDown = this._onUrlInputKeyDown.bind(this);
    this.onUrlChange = e => this.setState({ urlValue: e.target.value });
    this.promptForLink = this._promptForLink.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.showUrlInput = this._showUrlInput.bind(this);
    this.hideUrlInput = this._hideUrlInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const contentState = this.state.editorState.getCurrentContent();

    if (
      newProps.content &&
      ! this.props.content &&
      ! contentState.hasText()
    ) {
      const editorState = EditorState.createWithContent(convertFromRaw(newProps.content));
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
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    if (inlineStyle === 'LINK') {
      if (! this.state.showUrlInput) {
        this.promptForLink();
      } else {
        this.removeLink();
      }
    } else {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
  }

  _confirmUrl() {
    const { editorState, urlValue } = this.state;

    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });

    this.onChange(
      RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    );

    this.hideUrlInput();
  }

  _onUrlInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmUrl(e);
    }
  }

  _promptForLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (! selection.isCollapsed()) {
      if (RichUtils.currentBlockContainsLink(editorState)) {
        this.removeLink();
      } else {
        this.showUrlInput();
      }
    }
  }

  _removeLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    this.onChange(RichUtils.toggleLink(editorState, selection, null));
  }

  _showUrlInput() {
    this.setState({
      showUrlInput: true,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });
  }

  _hideUrlInput(editorState) {
    this.setState({
      showUrlInput: false,
      urlValue: '',
      editorState: editorState || this.state.editorState,
    }, () => {
      setTimeout(() => {
        this.focus();
      }, 0);
    });
  }

  _insertCustomBlock(editorState, type, data) {
    const entityKey = Entity.create(type, 'IMMUTABLE', data);

    // if you use an empty string for the block content here Draft will die
    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  }

  _toggleCustomBlockInput(nextState) {
    if (this.state.showCustomBlockInput && nextState.customBlockType === this.state.customBlockType) {
      this.setState({
        showCustomBlockInput: false,
        customBlockType: null,
        customBlockData: {},
      });
    } else {
      this.setState(nextState);
    }
  }

  renderBlock(block) {
    if (block.getType() === 'atomic') {
      const entityType = Entity.get(block.getEntityAt(0)).getType();

      return renderers[entityType] ? renderers[entityType].getBlockRenderer() : null;
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
            onKeyDown={this.onUrlInputKeyDown}
          />
          <button
            className="DraftJSEditor-urlInputButton"
            onMouseDown={this.confirmUrl}
          >
            Confirm
          </button>
        </div>
      );
    }

    let blockInput;
    if (this.state.showCustomBlockInput) {
      blockInput = renderers[this.state.customBlockType].renderInputForm(
        this.state.customBlockData,
        (data) => { this.setState({ customBlockData: data }); },
        () => {},
        () => {
          this.setState({
            customBlockData: {},
            customBlockType: null,
            editorState: this._insertCustomBlock(
              this.state.editorState,
              this.state.customBlockType,
              this.state.customBlockData
            ),
            showCustomBlockInput: false,
          });
        }
      );
    }

    return (
      <div className="DraftJSEditor-root">
        {this.renderControls()}
        {urlInput}
        {blockInput}
        <div className={className} onClick={this.focus}>
          <Editor
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
  blockControls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  customBlockControls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  content: React.PropTypes.object,
  controlDisplay: React.PropTypes.oneOf(['block', 'inline']),
  inlineControls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  spellCheck: React.PropTypes.bool,
  stripPastedStyles: React.PropTypes.bool,
};

DraftJSEditor.defaultProps = {
  blockControls: BLOCK_CONTROLS,
  controlDisplay: 'block',
  inlineControls: INLINE_CONTROLS,
  customBlockControls: ['IMG', 'IFRAME'],
  placeholder: '',
  readOnly: false,
  spellCheck: true,
  stripPastedStyles: false,
};

export default DraftJSEditor;
