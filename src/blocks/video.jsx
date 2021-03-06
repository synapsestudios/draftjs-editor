import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import Video from '../icons/Video';

const youtubeParser = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi; // eslint-disable-line
const vimeoParser = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/gi;

class EditorVideoBlock extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.block !== this.props.block;
  }
  render() {
    const entity = Entity.get(this.props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <iframe src={src} allowFullScreen />;
  }
}

EditorVideoBlock.propTypes = {
  block: PropTypes.object,
};

export default {
  getBlockRenderer() {
    return {
      component: EditorVideoBlock,
      editable: false,
    };
  },
  getInitialData() {
    return {
      src: '',
    };
  },
  getLabel() {
    return 'Video';
  },
  getIcon() {
    return <Video />;
  },
  renderHTML(data) {
    return `<iframe src="${data.src}" allowFullScreen></iframe>`;
  },
  renderInputForm(data, onDataChange, onKeyDown, onSubmit) {
    const updateSrc = e => {
      onDataChange({
        src: e.target.value,
      });
    };

    const transformSource = src => {
      let transformed = src;

      const youtubeId = youtubeParser.exec(src);
      const vimeoId = vimeoParser.exec(src);

      if (youtubeId) {
        transformed = `https://www.youtube.com/embed/${youtubeId[1]}`;
      } else if (vimeoId) {
        transformed = `https://player.vimeo.com/video/${vimeoId[5]}?color=c9ff23&title=0&byline=0&portrait=0`;
      }

      return transformed;
    };

    return (
      <div>
        <input
          onChange={updateSrc}
          type="text"
          value={data.src}
          onKeyDown={onKeyDown}
          placeholder="URL"
          ref={c => {
            this.refs.customBlockInput = c;
          }}
        />
        <button
          onClick={() => onSubmit({ src: transformSource(data.src) })}
        >
          Confirm
        </button>
      </div>
    );
  },
};
