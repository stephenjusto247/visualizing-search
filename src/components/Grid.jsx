import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Node from './Node';
import './Grid.css';

const propTypes = {
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
};

export default function Grid({ numRows, numCols }) {
  const [grid, setGrid] = useState([]);

  function handleClick(x, y) {
    const newGrid = [...grid];
    const node = newGrid[y][x];
    if (!node.isStart && !node.isTarget && !node.isPath && !node.isVisited) {
      node.isWall = !node.isWall;
      setGrid(newGrid);
    }
  }

  useEffect(() => {
    const newGrid = [];
    const startPos = {
      x: 25,
      y: 25,
    };
    const targetPos = {
      x: 50,
      y: 25,
    };

    for (let y = 0; y < numRows; y += 1) {
      const cols = [];
      for (let x = 0; x < numCols; x += 1) {
        cols.push({
          pos: { x, y },
          isStart: (x === startPos.x && y === startPos.y),
          isTarget: (x === targetPos.x && y === targetPos.y),
          isWall: false,
          isPath: false,
          isVisited: false,
        });
      }
      newGrid.push(cols);
    }

    setGrid(newGrid);
  }, []);

  return (
    <div className="grid">
      {grid.map((nodes, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="row" key={index}>
          {nodes.map((node) => {
            const { x, y } = node.pos;
            const key = `(${x},${y})`;
            return (
              <Node
                // eslint-disable-next-line react/jsx-no-bind
                handleClick={handleClick}
                pos={node.pos}
                isStart={node.isStart}
                isTarget={node.isTarget}
                isPath={node.isPath}
                isWall={node.isWall}
                isVisited={node.isVisited}
                key={key}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = propTypes;
