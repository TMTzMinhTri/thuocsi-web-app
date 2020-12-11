import React, { createContext, useContext } from 'react';
import { SnackBar } from 'components';

const NotifyContext = createContext({});
// const [listNotify, setListNotify] = useState([]);

// const NotifyContainer = (props) => {
//   const items = listNotify.map((notifycation) => {});
//   return <>{listNotify}</>;
// };

export const NotifyProvider = (props) => {
  const { children } = props;

  const createNotify = ({ type, message }) => <SnackBar alertType={type}>{message}</SnackBar>;

  //   const addNotify = ({ type, message }) => {
  //     const newNotify = createNotify({ type, message });
  //     setListNotify(listNotify.concat(newNotify));
  //   };

  //   const cleanNotify = () => {
  //     setInterval(() => {});
  //   };

  return <NotifyContext.Provider value={{ createNotify }}> {children}</NotifyContext.Provider>;
};
export const useNotify = () => useContext(NotifyContext);
