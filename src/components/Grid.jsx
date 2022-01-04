import React, { useEffect, useContext } from 'react';
import { Context } from '../Store';
import Node from './Node';
import './Grid.css';

export default function Grid() {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const newState = {
      grid: [],
    };
    const numRows = 50;
    const numCols = 100;
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
      newState.grid.push(cols);
    }

    setState(newState);
  }, []);

  return (
    <div className="grid">
      {state.grid.map((nodes, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="row" key={index}>
          {nodes.map((node) => {
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
      ))}
    </div>
  );
}
