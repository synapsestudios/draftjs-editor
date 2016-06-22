/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { stateToHTML as convertToHTML } from 'draft-js-export-html';
import { stateFromHTML as convertFromHTML } from 'draft-js-import-html';
import { stateToMarkdown as convertToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown as convertFromMarkdown } from 'draft-js-import-markdown';

/* eslint-disable */
const prebuiltRaw = {"entityMap":{},"blocks":[{"key":"au7ob","text":"RAW: Heading 1","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4ea5l","text":"And a blockquote","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"40cb9","text":"With a list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6r9r7","text":"And some items","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6qt67","text":"Maybe another item","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2lu4p","text":"And a secondary heading","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"90cfp","text":"With a paragraph at the end to wrap it all up","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}; // eslint-disable-line
const contentStateFromRaw = convertFromRaw(prebuiltRaw);

const prebuiltHTML = '<h1>HTML: Heading 1</h1>\n<blockquote>And a blockquote</blockquote>\n<ul>\n  <li>With a list</li>\n  <li>And some items</li>\n  <li>Maybe another item</li>\n</ul>\n<h2>And a secondary heading</h2>\n<p>With a paragraph at the end to wrap it all up</p>';
const contentStateFromHTML = convertFromHTML(prebuiltHTML);

const prebuiltMarkdown = '# MARKDOWN: Heading 1\n\n > And a blockquote\n\n- With a list\n- And some items\n- Maybe another item\n\n## And a secondary heading\n\nWith a paragraph at the end to wrap it all up\n';
const contentStateFromMarkdown = convertFromMarkdown(prebuiltMarkdown);
/* eslint-enable */

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

class SynapseDraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
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
    let className = 'SynapseDraft-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' SynapseDraft-hidePlaceholder';
      }
    }

    return (
      <div>
        <div className="SynapseDraft-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              console.log(convertToRaw(contentState));
              console.log(JSON.stringify(convertToRaw(contentState)));
            }}
          >
            Convert To Raw
          </button>
          <button
            onClick={() => {
              console.log(convertToHTML(contentState));
              console.log(JSON.stringify(convertToHTML(contentState)));
            }}
          >
            Convert To HTML
          </button>
          <button
            onClick={() => {
              console.log(convertToMarkdown(contentState));
              console.log(JSON.stringify(convertToMarkdown(contentState)));
            }}
          >
            Convert To Markdown
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({
                editorState: EditorState.createWithContent(contentStateFromRaw),
              });
            }}
          >
            Load from Raw
          </button>
          <button
            onClick={() => {
              this.setState({
                editorState: EditorState.createWithContent(contentStateFromHTML),
              });
            }}
          >
            Load from Pre-defined HTML
          </button>
          <button
            onClick={() => {
              this.setState({
                editorState: EditorState.createWithContent(contentStateFromMarkdown),
              });
            }}
          >
            Load from Pre-defined Markdown
          </button>
        </div>
      </div>
    );
  }
}

export default SynapseDraft;
