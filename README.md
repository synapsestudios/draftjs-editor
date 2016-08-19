Synapse Draft.js - [View Demo](http://synapsestudios.github.io/draftjs-editor/)
----
A simple WYSIWYG text editor utilizing Facebook's Draft.js library– customized by Synapse Studios

### Install
`npm install --save @synapsestudios/draftjs-editor`

### Usage
The default export is the React editor component itself:
`import SynapseDraft from '@synapsestudios/draftjs-editor';`

It also exports the following utilities:
* `DraftJSEditor` - The default React component  
* `Renderer(customBlocks)` - A constructor that creates a new Draft to HTML renderer, currently only exposes the method `convertRawToHTML(rawContent)`
* `defaultBlocks` - A default set of blocks to pass into the Renderer, these can be used or overridden in your own project as well
* `convertFromRaw()` - Simple passthrough of DraftJS's `convertFromRaw` utility

### `DraftJSEditor` Props
* `className` (string) - Classes to add to the editor component
* `id` (string) - ID to add to the editor component
* `customBlocks` (object) - An object containing the custom blocks you want the editor to render, see `defaultBlocks` for examples
* `customBlockControls` (array) - An array of keys of custom blocks to render the controls for


### Styles
Styles are not included by default. Include `scss/draftjs-editor.scss` in your local app.scss file to include the base styles.

### Development
* Development - `npm run demo`
* Distribution - `npm run build`
