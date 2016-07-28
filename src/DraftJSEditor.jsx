/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import { BLOCK_CONTROLS, INLINE_CONTROLS } from './controls';

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};

class DraftJSEditor extends Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);

    let editorState = EditorState.createEmpty(decorator);

    if (props.content) {
      editorState = EditorState.createWithContent(convertFromRaw(props.content), decorator);
    }

    this.state = {
      editorState,
      showUrlInput: false,
      urlValue: '',
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState }, () => {
        if (props.onChange) {
          const contentState = editorState.getCurrentContent();

          if (contentState.hasText()) {
            props.onChange(convertToRaw(contentState));
          } else {
            props.onChange(null);
          }
        }
      });
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    this.promptForLink = this._promptForLink.bind(this);
    this.onUrlChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
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
      this.promptForLink();
    } else if (inlineStyle === 'REMOVE-LINK') {
      this.removeLink();
    } else {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
  }

  // Link handling
  _confirmLink() {
    const { editorState, urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});

    this.onChange(
      RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    );

    this.setState({
      showUrlInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _promptForLink() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (! selection.isCollapsed()) {
      this.setState({
        showUrlInput: true,
        urlValue: '',
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  _removeLink() {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (! selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
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

    return (
      <div className="DraftJSEditor-root">
        {this.renderControls()}
        {urlInput}
        <div className={className} onClick={this.focus}>
          <Editor
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
  content: React.PropTypes.object,
  controlDisplay: React.PropTypes.oneOf(['block', 'inline']),
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
  placeholder: '',
  readOnly: false,
  spellCheck: true,
  stripPastedStyles: false,
};

export default DraftJSEditor;
