const initialState = {
  admin: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADMIN_DETAILS":
      return {
        ...state,
        admin: payload,
      };
    default:
      return state;
  }
}
