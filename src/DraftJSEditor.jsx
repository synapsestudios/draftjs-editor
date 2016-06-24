/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  convertFromRaw,
  convertToRaw,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import { BLOCK_CONTROLS, INLINE_CONTROLS } from './controls';

class DraftJSEditor extends Component {
  constructor(props) {
    super(props);

    let editorState = EditorState.createEmpty();

    if (props.content) {
      editorState = EditorState.createWithContent(convertFromRaw(props.content));
    }

    this.state = { editorState };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
      if (props.onChange) {
        props.onChange(convertToRaw(editorState.getCurrentContent()));
      }
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.content) {
      editorState = EditorState.createWithContent(convertFromRaw(newProps.content));
    }

    this.setState({ editorState });
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
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'DraftJSEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' DraftJSEditor-hidePlaceholder';
      }
    }

    return (
      <div className="DraftJSEditor-root">
        {this.props.blockControls ? (
          <BlockStyleControls
            controls={this.props.blockControls}
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        ) : null}
        {this.props.inlineControls ? (
          <InlineStyleControls
            controls={this.props.inlineControls}
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        ) : null}
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            ref="editor"
            spellCheck={this.props.spellCheck}
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
  content: React.PropTypes.object,
  blockControls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  spellCheck: React.PropTypes.bool,
};

DraftJSEditor.defaultProps = {
  blockControls: BLOCK_CONTROLS,
  inlineControls: INLINE_CONTROLS,
  placeholder: '',
  spellCheck: true,
};

export default DraftJSEditor;
