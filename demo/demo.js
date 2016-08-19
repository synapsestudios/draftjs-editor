import React from 'react';
import { DraftJSEditor, Renderer, defaultBlocks } from '../src';

const draftRenderer = new Renderer(defaultBlocks);

require('./demo.scss');

class DraftEditorDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: {
        entityMap: {},
        blocks: [
          {
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="demo__wrapper">
        <h1 className="h1 text-center">Draft.js Editor</h1>
        <p className="p text-center">
          {'A simple WYSIWYG text editor utilizing Facebook\'s Draft.js library– customized by Synapse Studios.'}
        </p>
        <p className="p text-center">
          View this project on <a href="https://github.com/synapsestudios/draftjs-editor">Github</a>
        </p>
        <DraftJSEditor
          content={this.state.content || null}
          onChange={content => this.setState({ content })}
          placeholder="Tell a story..."
          customBlocks={defaultBlocks}
          customBlockControls={Object.keys(defaultBlocks)}
        />
        {this.state.content ? (
          <div dangerouslySetInnerHTML={{ __html: draftRenderer.convertRawToHTML(this.state.content) }} />
        ) : null}
      </div>
    );
  }
}

export default DraftEditorDemo;
