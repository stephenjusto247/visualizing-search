import React, { useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Store';
import Node from './Node';
import { generateUniqueId } from '../lib/utils/generateUniqueId';
import './Grid.css';

const NUM_ROWS = 50;
const NUM_COLS = 100;

const propTypes = {
  startPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  targetPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default function Grid({ startPos, targetPos }) {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const newState = {
      grid: [],
    };

    for (let y = 0; y < NUM_ROWS; y += 1) {
      const cols = [];
      for (let x = 0; x < NUM_COLS; x += 1) {
        cols.push({
          pos: { x, y },
          isStart: (x === startPos.x && y === startPos.y),
          isTarget: (x === targetPos.x && y === targetPos.y),
          isWall: false,
          isPath: false,
          isVisited: false,
        });
      }
      newState.grid.push(cols);
    }

    setState(newState);
  }, [startPos, targetPos]);

  const displayGrid = useMemo(() => state.grid.map((nodes) => {
    const id = generateUniqueId();
    return (
      <div className="row" key={id}>
        { nodes.map((node) => {
          const { x, y } = node.pos;
          const key = `(${x},${y})`;
          return (
            <Node
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
    );
  }), [state.grid]);

  return (
    <div className="grid">
      {displayGrid}
    </div>
  );
}

Grid.propTypes = propTypes;
