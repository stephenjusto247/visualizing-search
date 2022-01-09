import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  grid: [],
  startPos: { x: 25, y: 25 },
  targetPos: { x: 35, y: 25 },
  started: false,
};

export const Context = createContext();

export default function Store({ children }) {
  const [state, setState] = useState(initialState);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}

Store.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};