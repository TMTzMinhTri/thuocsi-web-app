const Storage = (cartItems) => {
  // eslint-disable-next-line no-unused-expressions
  typeof localStorage !== 'undefined' &&
    localStorage.setItem('cartThuocSi', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  const itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  const total = cartItems.reduce(
    (totalItem, product) => totalItem + product.price * product.quantity,
    0,
  );
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  const { cartItems } = state;

  const data = action.payload && action.payload.cartItems ? action.payload.cartItems : [];
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        ...sumItems([...data]),
        cartItems: [...data],
        redeemCode: action.payload.redeemCode,
        note: action.payload.note,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        ...sumItems([]),
        cartItems: [],
        loading: false,
      };
    case 'ADD_ITEM':
      if (!cartItems.find((item) => item.sku === action.payload.sku)) {
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
        ...sumItems(cartItems.filter((item) => item.sku !== action.payload.sku)),
        cartItems: [...cartItems.filter((item) => item.sku !== action.payload.sku)],
      };
    case 'INCREASE':
      if (!cartItems.find((item) => item.sku === action.payload.sku)) {
        cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        cartItems[cartItems.findIndex((item) => item.sku === action.payload.sku)].quantity += 1;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case 'INCREASE_BY':
      if (!cartItems.find((item) => item.sku === action.payload.product.sku)) {
        cartItems.push({
          ...action.payload.product,
          quantity: action.payload.q,
        });
      } else {
        cartItems[cartItems.findIndex((item) => item.sku === action.payload.product.sku)].quantity =
          action.payload.q;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
      };
    case 'DECREASE':
      // eslint-disable-next-line no-case-declarations
      const currentItem = cartItems[cartItems.findIndex((item) => item.sku === action.payload.sku)];
      if (currentItem && currentItem.quantity !== 0) {
        currentItem.quantity -= 1;
      }
      return {
        ...state,
        ...sumItems(
          currentItem && currentItem.quantity !== 0
            ? cartItems
            : cartItems.filter((item) => item.sku !== action.payload.sku),
        ),
        cartItems:
          currentItem && currentItem.quantity !== 0
            ? [...cartItems]
            : [...cartItems.filter((item) => item.sku !== action.payload.sku)],
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
        state.cartItems.findIndex((item) => item.sku === action.payload.sku)
      ].isImportant = true;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case 'REMOVE_IMPORTANT':
      // eslint-disable-next-line no-param-reassign
      delete state.cartItems[state.cartItems.findIndex((item) => item.sku === action.payload.sku)]
        .isImportant;
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
