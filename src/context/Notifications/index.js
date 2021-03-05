import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { isValid } from 'clients';
import { NotifyService } from 'services';
import NotiReducer from './NotiReducer';

export const NotiContext = createContext();

export const NotiContextProvider = ({ children }) => {
  const initialState = { loading: true, notification: [], totalNotification: 0 };
  const [state, dispatch] = useReducer(NotiReducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const totalNotification = await NotifyService.getTotalNotification({});
        if (!totalNotification) {
          return;
        }
        const { unread, total, read } = totalNotification;
        const notificationRes = await NotifyService.getNotifications({});
        if (isValid(notificationRes)) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: { notification: notificationRes.data, unread, total, read },
          });
        } else {
          dispatch({ type: 'FETCH_ERROR' });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  const contextValues = {
    ...state,
  };

  return <NotiContext.Provider value={contextValues}>{children}</NotiContext.Provider>;
};

export const useNotify = () => useContext(NotiContext);
