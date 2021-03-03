const NotiReducer = (state, action) => {
  const { notification } = state;
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        notification: [...action.payload],
        unread: action.unread,
        total: action.total,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        notification: [],
        unread: action.unread,
        total: action.total,
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
