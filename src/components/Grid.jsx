import React, { useEffect, useState } from 'react';
import Node from './Node';
import './Grid.css';

export default function Grid() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = [];
    const numRows = 50;
    const numCols = 100;

    for (let y = 0; y < numRows; y += 1) {
      const cols = [];
      for (let x = 0; x < numCols; x += 1) {
        cols.push((<Node x={x} y={y} />));
      }
      newGrid.push(cols);
    }

    setGrid(newGrid);
  }, []);

  return (
    <div className="grid">
      {grid.map((nodes) => (
        <div className="row">
          {nodes.map((node) => {
            const { x, y } = node.props;
            const key = `(${x},${y})`;
            console.log(key);
            return React.cloneElement(node, { key });
          })}
        </div>
      ))}
    </div>
  );
}

// (0, 0)
