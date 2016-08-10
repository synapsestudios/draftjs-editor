import { Entity, AtomicBlockUtils } from 'draft-js';
import React from 'react';

export default {
  getNextEditorState(editorState, data) {
    const entityKey = Entity.create('IFRAME', 'IMMUTABLE', data);

    // if you use an empty string for the block content here Draft will die
    return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  },
  getBlockRenderer() {
    return {
      component: (props) => {
        const entity = Entity.get(props.block.getEntityAt(0));
        const { src } = entity.getData();
        return <iframe src={src} allowFullScreen></iframe>;
      },
      editable: false,
    };
  },
  renderHTML(data) {
    return `<iframe src="${data.src}" allowFullScreen></iframe>`;
  },
};
