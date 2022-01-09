import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Context } from './Store';
import Grid from './components/Grid';
import depthFirstSearch from './lib/algorithms/depthFirstSearch';
import breadthFirstSearch from './lib/algorithms/breadthFirstSearch';

function App() {
  const [state, setState] = useContext(Context);
  const [algorithm, setAlgorithm] = useState('breadth');
  const [needReset, setNeedReset] = useState(false);
  const [delay, setdelay] = useState(9);
  const GRIDSIZE = { numRows: 40, numCols: 80 };

  function animateShortestPath(path) {
    const currState = { ...state };
    if (path.length <= 0) {
      currState.started = false;
      setState(currState);
      setNeedReset(true);
    }

    for (let i = 0; i < path.length; i += 1) {
      const pos = path[i];
      setTimeout(() => {
        const element = document.getElementById(`(${pos.x},${pos.y})`);
        element.classList.add('path');
        if (i >= path.length - 1) {
          currState.started = false;
          setState(currState);
          setNeedReset(true);
        }
      }, (100 - (delay * 10)) * i);
    }
  }

  function handleReset() {
    if (!state.started && needReset) {
      for (let y = 0; y < GRIDSIZE.numRows; y += 1) {
        for (let x = 0; x < GRIDSIZE.numCols; x += 1) {
          const element = document.getElementById(`(${x},${y})`);
          element.classList.remove('visited');
          element.classList.remove('path');
        }
      }
      setNeedReset(false);
    }
  }

  function runSelectedAlgorithm() {
    const { startPos } = state;
    switch (algorithm) {
      case 'breadth':
        return breadthFirstSearch(state.grid, startPos.x, startPos.y);
      case 'depth':
        return depthFirstSearch(state.grid, startPos.x, startPos.y);
      default:
        return breadthFirstSearch(state.grid, startPos.x, startPos.y);
    }
  }

  function handleStart() {
    if (!state.started) {
      const currState = { ...state };
      currState.started = true;
      setState(currState);
      handleReset();
      const { visitInOrder, shortestPath } = runSelectedAlgorithm();
      if (visitInOrder.length <= 0) {
        currState.started = false;
        setState(currState);
      }
      for (let i = 0; i < visitInOrder.length; i += 1) {
        const pos = visitInOrder[i];
        setTimeout(() => {
          const element = document.getElementById(`(${pos.x},${pos.y})`);
          element.classList.add('visited');
          if (i >= visitInOrder.length - 1) {
            animateShortestPath(shortestPath);
          }
        }, (100 - (delay * 10)) * i);
      }
    }
  }

  function changeDelay(e, newValue) {
    const num = newValue;
    if (!Number.isNaN(num)) {
      setdelay(num);
    }
  }

  function changeAlgorithm(e) {
    setAlgorithm(e.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <select value={algorithm} onChange={changeAlgorithm} disabled={state.started}>
          <option value="breadth">Breadth First Search</option>
          <option value="depth">Depth First Search</option>
        </select>
        <button type="button" onClick={handleStart} disabled={state.started}>Start</button>
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider
              aria-label="Speed"
              step={1}
              marks
              min={5}
              max={9}
              value={delay}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={changeDelay}
              disabled={state.started}
            />
          </Stack>
        </Box>
      </div>
      <Grid startPos={state.startPos} targetPos={state.targetPos} size={GRIDSIZE} />
    </div>
  );
}

export default App;
