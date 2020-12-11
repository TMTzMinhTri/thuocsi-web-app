import React, { createContext, useContext } from 'react';

const NotifyContext = createContext({});
export const NotifyProvider = (props) => {
  const { children } = props;
  const addNotify = () => {};
  return <NotifyContext.Provider value={{ addNotify }}> {children}</NotifyContext.Provider>;
};
export const useNotify = () => useContext(NotifyContext);
