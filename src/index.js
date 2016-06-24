import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import DraftJSEditor from './DraftJSEditor';

export default DraftJSEditor;

export function convertRawToHTML(rawContent) {
  return stateToHTML(convertFromRaw(rawContent));
}
