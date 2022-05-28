const initialState = {
  loginLoader: false,
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
    default:
      return state;
  }
}
