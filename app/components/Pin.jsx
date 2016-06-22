import React from 'react';
import Stylizer from '../utils/stylizer';

const pinStyles = {
  block: {
    width: 15,
    height: 25,
    fill: 'transparent',
  },
  circle: {
    normal: {
      fill: 'darkgrey',
      stroke: 'black',
      strokeWidth: 1,
      cursor: 'default',
    },
    hover: {
      fill: 'red',
    },
  },
  text: {
    normal: {
      fill: 'black',
      fontSize: 12,
      aligmentBaseline: 'central',
      cursor: 'default',
    },
    hover: {
      fill: 'red',
    },
  },
};

export default class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.elId = `pin_${props.data.id}`;

    Stylizer.assignStyles(this, pinStyles);
    Stylizer.hoverable(this, ['circle', 'text']);
  }

  getPosition() {
    const radius = this.props.radius;
    return {
      x: this.props.viewState.bbox.getPosition().x + radius + 1,
      y: this.props.viewState.bbox.getPosition().y + radius + 1,
    };
  }
  getCircleProps() {
    return {
      cx: this.getPosition().x,
      cy: this.getPosition().y,
      r: this.props.radius,
    };
  }
  getTextProps() {
    const textMargin = (this.props.radius + 2) * ((this.isInput()) ? 1 : -1);
    const pos = this.getPosition();
    return {
      x: pos.x + textMargin,
      y: pos.y + this.getStyle().text.fontSize / 4,
      transform: `rotate(-90 ${pos.x}, ${pos.y})`,
      textAnchor: (this.isInput()) ? 'start' : 'end',
    };
  }

  getType() {
    return this.props.data.type;
  }
  isInput() {
    return (this.getType() === 'input');
  }
  isOutput() {
    return (this.getType() === 'output');
  }

  render() {
    const styles = this.getStyle();

    return (
      <g className="pin" id={this.elId} onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
        <rect style={styles.block} />
        <circle {...this.getCircleProps()} style={styles.circle} />
        <text
          key={`pinText_${this.props.data.id}`}
          {...this.getTextProps()}
          style={styles.text}
        >
          {this.props.data.key}
        </text>
      </g>
    );
  }
}

Pin.propTypes = {
  data: React.PropTypes.object,
  viewState: React.PropTypes.object,
  radius: React.PropTypes.number,
};
