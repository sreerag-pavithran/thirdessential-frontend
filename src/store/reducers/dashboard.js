const initialState = {
  loginLoader: false,
  users: [],
  products: [],
  singleProduct: [],
  report: [],
  showModal: false,
  updateData: {},
  loader: false,
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
    case "LOADER_ON":
      return {
        ...state,
        loader: true,
      };
    case "LOADER_OFF":
      return {
        ...state,
        loader: false,
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
    case "SHOW_MODAL_UPDATE":
      return {
        ...state,
        showModalUpdate: true,
      };
    case "HIDE_MODAL_UPDATE":
      return {
        ...state,
        showModalUpdate: false,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        updateData: payload,
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
