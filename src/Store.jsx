import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  grid: [],
  startPos: { x: 20, y: 20 },
  targetPos: { x: 40, y: 20 },
  started: false,
  setStart: false,
  setTarget: false,
  message: 'Yellow = Start & Red = Target | Click on the white cells to turn them into walls!',
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
