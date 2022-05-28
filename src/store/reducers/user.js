const initialState = {
  user: {},
  isVendor: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "USER_DETAILS":
      return {
        ...state,
        user: payload,
      };
    case "IS_VENDOR_ON":
      return {
        ...state,
        isVendor: true,
      };
    case "IS_VENDOR_OFF":
      return {
        ...state,
        isVendor: false,
      };
    default:
      return state;
  }
}
