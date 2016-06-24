import React from 'react';
import DraftJSEditor from '../src/DraftJSEditor';

require('./demo.scss');

/* eslint-disable */
// TODO
// const prebuiltRaw = {
//   "entityMap":{},
//   "blocks":[{"key":"au7ob","text":"RAW: Heading 1","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4ea5l","text":"And a blockquote","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"40cb9","text":"With a list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6r9r7","text":"And some items","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6qt67","text":"Maybe another item","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2lu4p","text":"And a secondary heading","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"90cfp","text":"With a paragraph at the end to wrap it all up","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]
// };
// const contentStateFromRaw = convertFromRaw(prebuiltRaw);
/* eslint-enable */

function DraftEditorDemo() {
  /*
    const content = {
      entityMap: {},
      blocks: [
        {
          key: '6dplo',
          text: 'Test',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
        },
      ],
    };
  */
  const content = undefined;

  return (
    <div className="demo__wrapper">
      <h1 className="h1 text-center">Draft.js Editor</h1>
      <p className="p text-center">
        A simple WYSIWYG text editor utilizing Facebook's Draft.js library– customized by Synapse Studios.
      </p>
      <p className="p text-center">
        View this project on <a href="https://github.com/synapsestudios/draftjs-editor">Github</a>
      </p>
      <DraftJSEditor
        content={content}
        onChange={content => {
          console.log(JSON.stringify(content));
        }}
        placeholder="Tell a story..."
      />
      {/*
        TODO
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
              console.log(convertToRaw(contentState));
              console.log(JSON.stringify(convertToRaw(contentState)));
            }}
          >
            Convert To Raw
          </button>
        </div>
      */}
    </div>
  );
}

export default DraftEditorDemo;
