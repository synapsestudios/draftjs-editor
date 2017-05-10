import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StyleButton extends Component {
  constructor() {
    super();

    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'DraftJSEditor-styleButton';
    if (this.props.active) {
      className += ' DraftJSEditor-activeButton';
    }

    return (
      <span
        className={className}
        title={this.props.label}
        onMouseDown={this.onToggle}
      >
        {this.props.icon ? this.props.icon : this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  onToggle: PropTypes.func,
  style: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.node,
};

export default StyleButton;
