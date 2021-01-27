import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { NotifyClient, isValid } from 'clients';
import NotiReducer from './NotiReducer';

export const NotiContext = createContext();

export const NotiContextProvider = ({ children }) => {
  const initialState = { loading: true, notification: [], totalNotification: 0 };
  const [state, dispatch] = useReducer(NotiReducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await NotifyClient.getNotify();
        if (isValid) {
          dispatch({ type: 'FETCH_SUCCESS', payload: response });
        } else {
          dispatch({ type: 'FETCH_ERROR' });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  const getNotifcations = () => {
    dispatch({ type: 'GET_NOTIFICATIONS' });
  };

  const contextValues = {
    getNotifcations,
    ...state,
  };

  return <NotiContext.Provider value={contextValues}>{children}</NotiContext.Provider>;
};

export const useNotify = () => useContext(NotiContext);
