import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Node.css';

const propTypes = {
  pos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isStart: PropTypes.bool,
  isTarget: PropTypes.bool,
  isWall: PropTypes.bool,
};

const defaultProps = {
  isStart: false,
  isTarget: false,
  isWall: false,
};

export default function Node({
  pos, isStart, isTarget, isWall,
}) {
  const [wall, setWall] = useState(isWall);

  function handleClick() {
    if (!isStart && !isTarget) {
      setWall(!wall);
    }
  }

  return (
    <div
      id={`(${pos.x},${pos.y})`}
      className={
      `node${isStart ? ' start' : ''}${wall ? ' wall' : ''}${isTarget ? ' target' : ''}`
      }
      aria-label="Node"
      role="button"
      tabIndex={0}
      onClick={() => handleClick(pos.x, pos.y)}
      onKeyPress={() => handleClick(pos.x, pos.y)}
    />
  );
}

Node.propTypes = propTypes;
Node.defaultProps = defaultProps;
