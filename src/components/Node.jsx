import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Store';
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
  const [state, setState] = useContext(Context);
  const [wall, setWall] = useState(isWall);

  function handleClick() {
    if (!state.started && !isStart && !isTarget) {
      const currState = { ...state };
      const node = currState.grid[pos.y][pos.x];
      node.isWall = !node.isWall;
      setWall(node.isWall);
      setState(currState);
    }
  }

  return (
    <div
      id={`(${pos.x},${pos.y})`}
      className={
      `node${isStart ? ' start' : ''}${isTarget ? ' target' : ''}${wall ? ' wall' : ''}`
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
