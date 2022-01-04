import React, { useEffect, useContext } from 'react';
import { Context } from './Store';
import Grid from './components/Grid';

function App() {
  const [state, setState] = useContext(Context);

  return (
    <Grid />
  );
}

export default App;
