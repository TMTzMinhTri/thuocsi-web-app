const Storage = (cartItems) => {
  // eslint-disable-next-line no-unused-expressions
  typeof localStorage !== 'undefined'
    && localStorage.setItem('cartThuocSi', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  const itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  // eslint-disable-next-line max-len
  const total = cartItems
    .reduce((totalItem, product) => totalItem + product.price * product.quantity, 0);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  const { cartItems } = state;
  switch (action.type) {
    case 'ADD_ITEM':
      if (!cartItems.find((item) => item.id === action.payload.id)) {
        cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        ...sumItems(cartItems.filter((item) => item.id !== action.payload.id)),
        cartItems: [...cartItems.filter((item) => item.id !== action.payload.id)],
      };
    case 'INCREASE':
      // eslint-disable-next-line no-param-reassign
      if (!cartItems.find((item) => item.id === action.payload.id)) {
        cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        cartItems[
          cartItems.findIndex((item) => item.id === action.payload.id)
        ].quantity += 1;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case 'INCREASE_BY':
      // eslint-disable-next-line no-param-reassign
      cartItems[
        cartItems.findIndex((item) => item.id === action.payload.product.id)
      ].quantity = action.payload.q;
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case 'DECREASE':
      // eslint-disable-next-line no-case-declarations
      const currentItem = cartItems[cartItems.findIndex((item) => item.id === action.payload.id)];
      if (currentItem && currentItem.quantity !== 0) {
        currentItem.quantity -= 1;
      }
      return {
        ...state,
        // eslint-disable-next-line max-len
        ...sumItems(
          currentItem && currentItem.quantity !== 0
            ? cartItems
            : cartItems.filter((item) => item.id !== action.payload.id),
        ),
        // eslint-disable-next-line max-len
        cartItems:
          currentItem && currentItem.quantity !== 0
            ? [...cartItems]
            : [...cartItems.filter((item) => item.id !== action.payload.id)],
      };
    case 'CHECKOUT':
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case 'ADD_IMPORTANT':
      // eslint-disable-next-line no-param-reassign
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].important = true;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'REMOVE_IMPORTANT':
      // eslint-disable-next-line no-param-reassign
      delete state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].important;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
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
