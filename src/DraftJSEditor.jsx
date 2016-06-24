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
        const contentState = editorState.getCurrentContent();
        if (contentState.hasText()) {
          props.onChange(convertToRaw(contentState));
        } else {
          props.onChange(null);
        }
      }
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.content &&
      ! this.props.content &&
      ! this.state.editorState.getCurrentContent().hasText()
    ) {
      const editorState = EditorState.createWithContent(convertFromRaw(newProps.content));
      this.setState({ editorState });
    }
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

    return (
      <div className="DraftJSEditor-root">
        {this.renderControls()}
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
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
  controlDisplay: React.PropTypes.oneOf(['block', 'inline']),
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
  controlDisplay: 'block',
  inlineControls: INLINE_CONTROLS,
  placeholder: '',
  spellCheck: true,
};

export default DraftJSEditor;
