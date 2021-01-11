// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import {} from 'clients';
// import { NotiReducer } from './NotiReducer';

// export const NotiContext = createContext();

// export const CartContextProvider = ({ children }) => {
//   const initialState = { loading: true };
//   const [state, dispatch] = useReducer(NotiReducer, initialState);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await ProductClient.loadDataCart();
//         dispatch({ type: 'FETCH_SUCCESS', payload: response.product });
//       } catch (error) {
//         dispatch({ type: 'FETCH_ERROR' });
//       }
//     }
//     fetchData();
//   }, []);

//   const increase = (payload) => {
//     dispatch({ type: 'INCREASE', payload });
//   };

//   const increaseBy = (payload) => {
//     dispatch({ type: 'INCREASE_BY', payload });
//   };

//   const decrease = (payload) => {
//     dispatch({ type: 'DECREASE', payload });
//   };

//   const addProduct = (payload) => {
//     dispatch({ type: 'ADD_ITEM', payload });
//   };

//   const removeProduct = (payload) => {
//     dispatch({ type: 'REMOVE_ITEM', payload });
//   };

//   const clearCart = () => {
//     dispatch({ type: 'CLEAR' });
//   };

//   const handleCheckout = () => {
//     dispatch({ type: 'CHECKOUT' });
//   };

//   const addImportant = (payload) => {
//     dispatch({ type: 'ADD_IMPORTANT', payload });
//   };

//   const removeImportant = (payload) => {
//     dispatch({ type: 'REMOVE_IMPORTANT', payload });
//   };

//   const contextValues = {
//     removeProduct,
//     addProduct,
//     increase,
//     decrease,
//     clearCart,
//     handleCheckout,
//     increaseBy,
//     addImportant,
//     removeImportant,
//     ...state,
//   };

//   return (
//     <NotiContext.Provider value={contextValues}>
//       { children }
//     </NotiContext.Provider>
//   );
// };

// export const useCart = () => useContext(NotiContext);
