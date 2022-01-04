import React from 'react';
import PropTypes from 'prop-types';
import './Node.css';

const propTypes = {
  pos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
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
  pos, isStart, isTarget, isWall, isVisited, isPath, handleClick,
}) {
  return (
    <div
      className={
      `node${isStart ? ' start' : ''}${isWall ? ' wall' : ''}${isTarget ? ' target' : ''}${isVisited ? ' visited' : ''}${isPath ? ' path' : ''}`
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
