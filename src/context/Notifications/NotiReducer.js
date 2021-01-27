const NotiReducer = (state, action) => {
  const { notification } = state;
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        notification: [...action.payload],
        totalNotification: [...action.payload].length,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        notification: [],
        totalNotification: 0,
        loading: false,
      };
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notification: [...notification],
        totalNotification: [...notification].length,
      };
    default:
      return state;
  }
};

export default NotiReducer;
