// const NotiReducer = (state, action) => {
//   const { cartItems } = state;
//   switch (action.type) {
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         ...sumItems([...action.payload]),
//         cartItems: [...action.payload],
//         loading: false,
//       };
//     case 'FETCH_ERROR':
//       return {
//         ...state,
//         ...sumItems([]),
//         cartItems: [],
//         loading: false,
//       };
//     case 'ADD_ITEM':
//       if (!cartItems.find((item) => item.sku === action.payload.sku)) {
//         cartItems.push({
//           ...action.payload,
//           quantity: 1,
//         });
//       }

//       return {
//         ...state,
//         ...sumItems(cartItems),
//         cartItems: [...cartItems],
//       };
//     case 'DECREASE':
//       // eslint-disable-next-line no-case-declarations
//       const currentItem = cartItems[cartItems.findIndex((item) => item.sku === action.payload.sku)];
//       if (currentItem && currentItem.quantity !== 0) {
//         currentItem.quantity -= 1;
//       }
//       return {
//         ...state,
//         // eslint-disable-next-line max-len
//         ...sumItems(
//           currentItem && currentItem.quantity !== 0
//             ? cartItems
//             : cartItems.filter((item) => item.sku !== action.payload.sku),
//         ),
//         // eslint-disable-next-line max-len
//         cartItems:
//             currentItem && currentItem.quantity !== 0
//               ? [...cartItems]
//               : [...cartItems.filter((item) => item.sku !== action.payload.sku)],
//       };
//     case 'CHECKOUT':
//       return {
//         cartItems: [],
//         checkout: true,
//         ...sumItems([]),
//       };
//     case 'ADD_IMPORTANT':
//       // eslint-disable-next-line no-param-reassign
//       state.cartItems[
//         state.cartItems.findIndex((item) => item.sku === action.payload.sku)
//       ].important = true;
//       return {
//         ...state,
//         ...sumItems(state.cartItems),
//         cartItems: [...state.cartItems],
//       };
//     case 'REMOVE_IMPORTANT':
//       // eslint-disable-next-line no-param-reassign
//       delete state.cartItems[
//         state.cartItems.findIndex((item) => item.sku === action.payload.sku)
//       ].important;
//       return {
//         ...state,
//         ...sumItems(state.cartItems),
//         cartItems: [...state.cartItems],
//       };
//     case 'CLEAR':
//       return {
//         cartItems: [],
//         ...sumItems([]),
//       };
//     default:
//       return state;
//   }
// };

// export default NotiReducer;
