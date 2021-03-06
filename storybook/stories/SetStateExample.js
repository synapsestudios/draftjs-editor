import React, { Component } from 'react';
import { action } from '@kadira/storybook';
import { DraftJSEditor, Renderer, defaultBlocks } from '../../src';

const draftRenderer = new Renderer(defaultBlocks);

const containerStyling = {
  width: '500px',
  height: '500px',
}

class SetStateExample extends Component {
  state = {
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

  onChange = content => {
    action('onChange')(content); // Log to storybook's "action-logger"
    this.setState({ content });
  };

  render() {
    return (
      <div>
        <h1>@synapsestudios/draftjs-editor</h1>
        <p className="p text-center">
          {`A customized WYSIWYG editor utilizing Facebook's Draft.js library`}
        </p>
        <p className="p text-center">
          View this project on
          {' '}
          <a href="https://github.com/synapsestudios/draftjs-editor" target="_blank">Github</a>
        </p>
        <DraftJSEditor
          containerStyle={containerStyling}
          content={this.state.content || null}
          onChange={this.onChange}
          placeholder="Tell a story..."
          customBlocks={defaultBlocks}
          customBlockControls={Object.keys(defaultBlocks)}
        />
        {this.state.content
          ? <div
              dangerouslySetInnerHTML={{
                __html: draftRenderer.convertRawToHTML(this.state.content),
              }}
            />
          : null}
      </div>
    );
  }
}

export default SetStateExample;
