import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Node.css';

export default function Node({ x, y }) {
  const [isWall, setIsWall] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [isVisited, setIsVisisted] = useState(false);
  const [isPath, setIsPath] = useState(false);

  function handleClick(e) {
    setIsWall(!isWall);
  }

  return (
    <div
      className={
      `node${isWall ? ' wall' : ''}${isTarget ? ' target' : ''}${isVisited ? ' visited' : ''}${isPath ? ' path' : ''}`
      }
      aria-label="Node"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
    />
  );
}

Node.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
