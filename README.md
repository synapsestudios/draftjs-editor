# [@synapsestudios/draftjs-editor](https://synapsestudios.github.io/draftjs-editor/)

A simple WYSIWYG text editor utilizing Facebook's Draft.js library– customized by Synapse Studios

[![npm version](https://img.shields.io/npm/v/@synapsestudios/draftjs-editor.svg?style=flat)](https://www.npmjs.com/package/@synapsestudios/draftjs-editor)
[![draftjs-editor dependencies](https://img.shields.io/david/synapsestudios/draftjs-editor.svg)](https://david-dm.org/synapsestudios/draftjs-editor)
[![draftjs-editor peer dependencies](https://img.shields.io/david/peer/synapsestudios/draftjs-editor.svg)](https://david-dm.org/synapsestudios/draftjs-editor?type=peer)

## Demo

A demo is available at [https://synapsestudios.github.io/draftjs-editor/](https://synapsestudios.github.io/draftjs-editor/)

## Usage

#### Installing via CLI
```js
// yarn
yarn add @synapsestudios/draftjs-editor

// npm
npm install --save @synapsestudios/draftjs-editor
```

#### Importing JS
The default export is the React editor component itself:
```js
import SynapseDraft from '@synapsestudios/draftjs-editor';
```

It also exports the following utilities:
* `DraftJSEditor` - The default React component  
* `Renderer(customBlocks)` - A constructor that creates a new Draft to HTML renderer, currently only exposes the method `convertRawToHTML(rawContent)`
* `defaultBlocks` - A default set of blocks to pass into the Renderer, these can be used or overridden in your own project as well
* `convertFromRaw()` - Simple passthrough of DraftJS's `convertFromRaw` utility

#### Importing CSS
```js
// Minified, autoprefixed css
import '@synapsestudios/draftjs-editor/lib/draftjs-editor.min.css';

// Not-minified, not-autoprefixed css
import '@synapsestudios/draftjs-editor/lib/draftjs-editor.css';
```

#### Using Stylus
If you are using Stylus you can import the .styl file into your build:
```styl
@import '@synapsestudios/draftjs-editor/lib/draftjs-editor.styl';
```

## API

### `Props`
* `className` (string) - Classes to add to the editor component
* `id` (string) - ID to add to the editor component
* `customBlocks` (object) - An object containing the custom blocks you want the editor to render, see `defaultBlocks` for examples
* `customBlockControls` (array) - An array of keys of custom blocks to render the controls for

### `Renderer` Methods
* `convertRawToHTML(rawContent)` - Takes raw DraftJS state object and renders it to HTML

## Contributing

To run the project on your own computer:
* Clone this repository
* `yarn install` or `npm install`
* `yarn run storybook` or `npm run storybook`
* Visit http://localhost:5000/
* Changes made to files in the `src` directory should immediately compile and be visible in your browser.
