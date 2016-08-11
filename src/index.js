import { convertFromRaw, Entity } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import DraftJSEditor from './DraftJSEditor';
import renderers from './renderers';

export default DraftJSEditor;

export function convertRawToHTML(rawContent) {
  const options = {
    blockRenderers: {
      atomic: block => {
        const data = Entity.get(block.getEntityAt(0)).getData();
        const type = Entity.get(block.getEntityAt(0)).getType();

        return renderers[type] ? renderers[type].renderHTML(data) : null;
      },
    },
  };

  return stateToHTML(convertFromRaw(rawContent), options);
}
