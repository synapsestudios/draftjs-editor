import { convertFromRaw, Entity } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default class Renderer {
  constructor(customBlocks) {
    this.customBlocks = customBlocks;

    this.convertRawToHTML = this.convertRawToHTML.bind(this);
  }

  convertRawToHTML(rawContent) {
    let entityMapIndex = 0;
    const options = {
      blockRenderers: {
        atomic: block => {
          const entity = rawContent.entityMap[entityMapIndex];
          const data = entity.data;
          const type = entity.type;
          entityMapIndex += 1;

          return this.customBlocks[type]
            ? this.customBlocks[type].renderHTML(data)
            : null;
        },
      },
    };

    return stateToHTML(convertFromRaw(rawContent), options);
  }
}
