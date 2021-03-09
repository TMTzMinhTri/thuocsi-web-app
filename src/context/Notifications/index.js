import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getFirst, isValid } from 'clients';
import { NotifyService, UserService } from 'services';
// import { NotifyUtils } from 'utils';
import NotiReducer from './NotiReducer';

export const NOTIFY_TYPES = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

export const NotiContext = createContext();

export const NotiContextProvider = ({ children }) => {
  const initialState = { loading: true, notification: [], totalNotification: 0, initSocket: false };
  const [state, dispatch] = useReducer(NotiReducer, initialState);

  const fetchData = async () => {
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
  };

  const initSocketFunc = async ({ ctx }) => {
    try {
      const url = `wss://${window.location.hostname}/integration/notification/v1/web-socket`;
      const ws = new WebSocket(url);
      // TODO
      const authSocket = async () => {
        const accRes = await UserService.getAccountInfo({ ctx });
        if (!isValid(accRes)) {
          return;
        }
        const accData = getFirst(accRes);
        const { account, session = {} } = accData;
        const { token, type } = session;
        const authMessage = {
          topic: 'AUTHORIZATION',
          content: {
            username: account.username,
            sessionToken: token,
            type,
          },
        };
        // NotifyUtils.success(`SOCKET: send auth message ${JSON.stringify(authMessage)}`);
        ws.send(JSON.stringify(authMessage));
      };

      ws.onopen = function () {
        // NotifyUtils.success('SOCKET: is open ');
      };
      ws.onclose = function () {
        // NotifyUtils.error('SOCKET: is closed ');
        authSocket({});
      };

      ws.onmessage = function (e) {
        try {
          // NotifyUtils.success('SOCKET: is on message ');
          const data = JSON.parse(e.data);
          if (data.topic === 'CONNECTED') {
            authSocket({});
          } else {
            // NotifyUtils.info('Bạn có thông báo mới.');
            fetchData();
          }
        } catch (ex) {
          console.log(ex);
        }
      };
      //
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    initSocketFunc({});
  }, []);

  const markAll = async () => {
    const rest = await NotifyService.markReadAll({});
    fetchData();
    return rest;
  };

  const markReadByCode = async (code) => {
    const res = await NotifyService.markReadByCode({ code });
    fetchData();
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
