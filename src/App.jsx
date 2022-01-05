import React, { useContext, useState } from 'react';
import { Context } from './Store';
import Grid from './components/Grid';
import depthFirstSearch from './lib/algorithms/depthFirstSearch';

function App() {
  const [state, setState] = useContext(Context);
  const [startPos, setStartPos] = useState({ x: 25, y: 25 });
  const [targetPos, setTargetPos] = useState({ x: 50, y: 25 });
  const [started, setStarted] = useState(false);
  const [multiplier, setMultiplier] = useState(10);

  function handleClick() {
    if (!started) {
      setStarted(true);
      const path = depthFirstSearch(state.grid, 25, 25);
      for (let i = 0; i < path.length; i += 1) {
        const pos = path[i];
        setTimeout(() => {
          const element = document.getElementById(`(${pos.x},${pos.y})`);
          element.classList.add('visited');
          if (i >= path.length - 1) setStarted(false);
        }, multiplier * i);
      }
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick} active={started}>Start</button>
      <Grid startPos={startPos} targetPos={targetPos} />
    </div>
  );
}

export default App;
