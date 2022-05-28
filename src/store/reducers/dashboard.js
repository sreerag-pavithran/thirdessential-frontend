const initialState = {
  loginLoader: false,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_LOADER_ON":
      return {
        ...state,
        loginLoader: true,
      };
    case "LOGIN_LOADER_OFF":
      return {
        ...state,
        loginLoader: false,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
}
