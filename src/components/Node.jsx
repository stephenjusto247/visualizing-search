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
  const [start, setStart] = useState(isStart);
  const [target, setTarget] = useState(isTarget);
  const [wall, setWall] = useState(isWall);

  function handleClick() {
    if (!state.started) {
      const currState = { ...state };
      const node = currState.grid[pos.y][pos.x];
      if (state.setStart && !target && !wall) { // change node to start node
        currState.message = `New START position set at (${pos.x},${pos.y})`;
        currState.setStart = false;
        currState.startPos = { x: pos.x, y: pos.y };
        node.isStart = true;
        setStart(true);
      } else if (state.setTarget && !start && !wall) { // change node to target node
        currState.message = `New TARGET position set at (${pos.x},${pos.y})`;
        currState.setTarget = false;
        currState.targetPos = { x: pos.x, y: pos.y };
        node.isTarget = true;
        setTarget(true);
      } else if (!start && !target && !state.setStart && !state.setTarget) { // change node to wall
        node.isWall = !node.isWall;
        setWall(node.isWall);
      } else if (start && !state.setStart && !state.setTarget) { // remove node as start
        currState.message = 'Click on a white cell to set it as the START position!';
        currState.setStart = true;
        node.isStart = false;
        setStart(false);
      } else if (target && !state.setStart && !state.setTarget) { // remove node as target
        currState.message = 'Click on a white cell to set it as the TARGET position!';
        currState.setTarget = true;
        node.isTarget = false;
        setTarget(false);
      }
      setState(currState);
    }
  }

  return (
    <div
      id={`(${pos.x},${pos.y})`}
      className={
      `node${start ? ' start' : ''}${target ? ' target' : ''}${wall ? ' wall' : ''}`
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
