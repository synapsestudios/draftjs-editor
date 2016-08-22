import DraftJSEditor from './DraftJSEditor';
import Renderer from './renderer';
import imgBlock from './blocks/img';
import videoBlock from './blocks/video';

import { convertFromRaw, convertToRaw, Entity } from 'draft-js';

const defaultBlocks = {
  IMG: imgBlock,
  VIDEO: videoBlock,
};

export default DraftJSEditor;

export {
  DraftJSEditor,
  Renderer,
  defaultBlocks,
  convertFromRaw,
  convertToRaw,
  Entity,
};
