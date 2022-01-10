import React, { useContext, useState, useEffect } from 'react';
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
  const [timeouts, setTimeouts] = useState([]);
  const GRIDSIZE = { numRows: 40, numCols: 80 };

  useEffect(() => {
    console.log(state.started);
  }, [state]);

  function animateShortestPath(path) {
    const currTimeouts = [...timeouts];
    const currState = { ...state };
    if (path.length <= 0) {
      currState.started = false;
      currState.message = 'Complete';
      setState(currState);
      setNeedReset(true);
    }

    for (let i = 0; i < path.length; i += 1) {
      const pos = path[i];
      currTimeouts.push(setTimeout(() => {
        const element = document.getElementById(`(${pos.x},${pos.y})`);
        element.classList.add('path');
        if (i >= path.length - 1) {
          currState.started = false;
          currState.message = 'Complete';
          setState(currState);
          setNeedReset(true);
        }
      }, (100 - (delay * 10)) * i));
    }

    setTimeouts(currTimeouts);
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
    const currState = { ...state };
    const { startPos } = state;
    currState.started = true;

    switch (algorithm) {
      case 'breadth':
        currState.message = 'Executing breadth first search';
        setState(currState);
        return breadthFirstSearch(state.grid, startPos.x, startPos.y);
      case 'depth':
        currState.message = 'Executing depth first search';
        setState(currState);
        return depthFirstSearch(state.grid, startPos.x, startPos.y);
      default:
        currState.message = 'Executing breadth first search';
        setState(currState);
        return breadthFirstSearch(state.grid, startPos.x, startPos.y);
    }
  }

  function handleStart() {
    if (!state.started && !state.setStart && !state.setTarget) {
      handleReset();
      const currTimeouts = [];
      const currState = { ...state };
      const { visitInOrder, shortestPath } = runSelectedAlgorithm();
      if (visitInOrder.length <= 0) {
        currState.started = false;
        currState.message = 'Complete';
        setState(currState);
      }
      for (let i = 0; i < visitInOrder.length; i += 1) {
        const pos = visitInOrder[i];
        currTimeouts.push(setTimeout(() => {
          const element = document.getElementById(`(${pos.x},${pos.y})`);
          element.classList.add('visited');
          if (i >= visitInOrder.length - 1) {
            animateShortestPath(shortestPath);
          }
        }, (100 - (delay * 10)) * i));
      }
      setTimeouts(currTimeouts);
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

  function handleCancel() {
    if (state.started) {
      const currState = { ...state };
      currState.started = false;
      currState.message = 'Execution cancelled';

      for (let i = 0; i < timeouts.length; i += 1) {
        clearTimeout(timeouts[i]);
      }

      setTimeouts([]);
      setNeedReset(true);
      setState(currState);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <select value={algorithm} onChange={changeAlgorithm} disabled={state.started}>
          <option value="breadth">Breadth First Search</option>
          <option value="depth">Depth First Search</option>
        </select>
        <button type="button" onClick={handleStart} disabled={state.started || state.setStart || state.setTarget}>Start</button>
        <button type="button" onClick={handleCancel} disabled={!state.started}>Cancel</button>
        <button type="button" onClick={handleReset} disabled={!needReset}>Clear Path</button>
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
      <div style={{ display: 'flex', fontWeight: 'bold' }}>
        <p>{state.message}</p>
      </div>
      <Grid startPos={state.startPos} targetPos={state.targetPos} size={GRIDSIZE} />
    </div>
  );
}

export default App;
