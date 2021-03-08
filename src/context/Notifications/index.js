import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getFirst, isValid } from 'clients';
import { NotifyService, UserService } from 'services';
import { NotifyUtils } from 'utils';
import NotiReducer from './NotiReducer';

export const NOTIFY_TYPES = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

export const NotiContext = createContext();

export const NotiContextProvider = ({ children }) => {
  const initialState = { loading: true, notification: [], totalNotification: 0, initSocket: false };
  const [state, dispatch] = useReducer(NotiReducer, initialState);

  const initSocketFunc = async ({ ctx }) => {
    const accRes = await UserService.getAccountInfo({ ctx });
    if (!isValid(accRes)) {
      return;
    }
    //
    const accData = getFirst(accRes);

    const { account, session } = accData;
    const { token, type } = session;
    const url = `wss://${window.location.hostname}/integration/notification/v1/web-socket`;
    const ws = new WebSocket(url);

    ws.onopen = function () {
      NotifyUtils.success('SOCKET: is open ');
    };
    ws.onclose = function () {
      NotifyUtils.error('SOCKET: is closed ');
    };

    ws.onmessage = function (e) {
      NotifyUtils.success('SOCKET: is on message ');
      const data = JSON.parse(e.data);
      if (data.topic === 'CONNECTED') {
        const authMessage = {
          topic: 'AUTHORIZATION',
          content: {
            type,
            username: account.username,
            sessionToken: token,
          },
        };
        NotifyUtils.success(`SOCKET: send auth message ${JSON.stringify(authMessage)}`);
        ws.send(JSON.stringify(authMessage));
      }
    };
  };

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
            type: NOTIFY_TYPES.FETCH_SUCCESS,
            payload: { notification: notificationRes.data, unread, total, read },
          });
        } else {
          dispatch({ type: NOTIFY_TYPES.FETCH_ERROR });
        }
      } catch (error) {
        dispatch({ type: NOTIFY_TYPES.FETCH_ERROR });
      }
    }
    fetchData();
    initSocketFunc({});
  }, []);

  const markAll = async () => {
    const rest = await NotifyService.markReadAll({});
    return rest;
  };

  const markReadByCode = async (code) => {
    const res = await NotifyService.markReadByCode({ code });
    return res;
  };

  const contextValues = {
    ...state,
    markAll,
    markReadByCode,
  };

  return <NotiContext.Provider value={contextValues}>{children}</NotiContext.Provider>;
};

export const useNotify = () => useContext(NotiContext);
