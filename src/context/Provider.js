/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { createContext, useState } from 'react';

const AuthContext = createContext({});
const StateContext = createContext({});

export function StateProvider({ children }) {
  const [appState, setAppState] = useState({});

  return (
    <StateContext.Provider value={{ appState, setAppState }}>
      {children}
    </StateContext.Provider>
  );
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default {
  AuthContext,
  StateContext,
};
