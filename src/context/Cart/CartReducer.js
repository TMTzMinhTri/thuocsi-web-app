const Storage = (cartItems) => {
  // eslint-disable-next-line no-unused-expressions
  typeof localStorage !== 'undefined' && localStorage.setItem('cartThuocSi', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  const itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  // eslint-disable-next-line max-len
  const total = cartItems.reduce((totalItem, product) => totalItem + product.price * product.quantity, 0).toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        ...sumItems(state.cartItems.filter((item) => item.id !== action.payload.id)),
        cartItems: [...state.cartItems.filter((item) => item.id !== action.payload.id)],
      };
    case 'INCREASE':
      // eslint-disable-next-line no-param-reassign
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === action.payload.id)
        ].quantity += 1;
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'INCREASE_BY':
      // eslint-disable-next-line no-param-reassign
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.productItem.id)
      ].quantity = action.payload.q;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'DECREASE':
      // eslint-disable-next-line no-case-declarations
      const currentItem = state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ];
      if (currentItem && currentItem.quantity !== 0) {
        currentItem.quantity -= 1;
      }
      return {
        ...state,
        // eslint-disable-next-line max-len
        ...sumItems(currentItem.quantity !== 0 ? state.cartItems : state.cartItems.filter((item) => item.id !== action.payload.id)),
        // eslint-disable-next-line max-len
        cartItems: currentItem.quantity !== 0 ? [...state.cartItems] : [...state.cartItems.filter((item) => item.id !== action.payload.id)],
      };
    case 'CHECKOUT':
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case 'CLEAR':
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
