import React, { Component, PropTypes } from 'react';

class StyleButton extends Component {
  constructor() {
    super();

    this.onToggle = (e) => {
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
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  onToggle: PropTypes.func,
  style: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string,
};

export default StyleButton;
