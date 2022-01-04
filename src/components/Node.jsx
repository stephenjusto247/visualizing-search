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
  isWall: PropTypes.bool,
  isVisited: PropTypes.bool,
  isPath: PropTypes.bool,
  isTarget: PropTypes.bool,
};

const defaultProps = {
  isStart: false,
  isWall: false,
  isVisited: false,
  isPath: false,
  isTarget: false,
};

export default function Node({
  pos, isStart, isTarget, isWall, isVisited, isPath,
}) {
  const [state, setState] = useContext(Context);
  const [wall, setWall] = useState(isWall);

  function handleClick() {
    if (!isStart && !isTarget) {
      setWall(!wall);
    }
    /*
    const currState = { ...state };
    const { grid } = currState;
    const node = grid[pos.y][pos.x];
    if (!node.isStart && !node.isTarget) {
      node.isWall = !node.isWall;
      grid[pos.y][pos.x] = node;
      setState(currState);
    }
    */
  }

  return (
    <div
      className={
      `node${isStart ? ' start' : ''}${wall ? ' wall' : ''}${isTarget ? ' target' : ''}${isVisited ? ' visited' : ''}${isPath ? ' path' : ''}`
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
