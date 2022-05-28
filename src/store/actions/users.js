import axios from "axios";
import { message as notify } from "antd";

export const createUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/users/create-user`,
      userData,
      config
    );
    const {
      data: { status, message, data },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && dispatch({ type: "FETCH_USERS", payload: data });

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
