const NotiReducer = (state, action) => {
  const { notification } = state;
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        notification: [...action.payload.notification],
        unread: action.payload.unread,
        total: action.payload.total,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        notification: [],
        unread: 0,
        total: 0,
        loading: false,
      };
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notification: [...notification],
      };
    default:
      return state;
  }
};

export default NotiReducer;
