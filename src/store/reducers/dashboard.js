const initialState = {
  loginLoader: false,
  users: [],
  products: [],
  singleProduct: [],
  report: [],
  showModal: false,
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
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
      };
    case "FETCH_USERS":
      return {
        ...state,
        users: payload,
      };
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "FETCH_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: payload,
      };
    case "FETCH_REPORT":
      return {
        ...state,
        report: payload,
      };
    default:
      return state;
  }
}
