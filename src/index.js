import DraftJSEditor from './DraftJSEditor';
import Renderer from './renderer';
import imgBlock from './blocks/img';
import iframeBlock from './blocks/iframe';

import { convertFromRaw } from 'draft-js';

const defaultBlocks = {
  IMG: imgBlock,
  IFRAME: iframeBlock,
};

export default DraftJSEditor;

export {
  DraftJSEditor,
  Renderer,
  defaultBlocks,
  convertFromRaw,
};
