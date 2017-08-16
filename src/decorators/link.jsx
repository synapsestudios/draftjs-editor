import React from 'react';
import PropTypes from 'prop-types';

const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

const Link = props => {
  const { target, url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} target={target}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.any,
  children: PropTypes.any,
};

export default {
  strategy: linkStrategy,
  component: Link,
};
