const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        token: action.payload,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export default Reducer;
