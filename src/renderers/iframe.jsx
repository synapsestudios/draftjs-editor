import { Entity } from 'draft-js';
import React from 'react';

export default {
  getBlockRenderer() {
    return {
      component: props => {
        const entity = Entity.get(props.block.getEntityAt(0));
        const { src } = entity.getData();
        return <iframe src={src} allowFullScreen></iframe>;
      },
      editable: false,
    };
  },
  getInitialData() {
    return {
      src: '',
    };
  },
  getLabel() {
    return 'IFrame';
  },
  renderHTML(data) {
    return `<iframe src="${data.src}" allowFullScreen></iframe>`;
  },
  renderInputForm(data, onDataChange, onKeyDown, onSubmit) {
    const updateSrc = (e) => {
      onDataChange({
        src: e.target.value,
      });
    };

    return (
      <div>
        <input
          onChange={updateSrc}
          type="text"
          value={data.src}
          onKeyDown={onKeyDown}
        />
        <button onMouseDown={onSubmit}>
          Confirm
        </button>
      </div>
    );
  },
};
