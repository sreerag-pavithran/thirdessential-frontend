import axios from "axios";
import { message as notify } from "antd";

export const adminLogin = (adminData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const bodyData = {
      email: adminData?.email,
      password: adminData?.password,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/login`,
      bodyData,
      config
    );
    const {
      data: { status, message, data, access_token },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && localStorage.setItem("token", access_token);
    status && dispatch({ type: "ADMIN_DETAILS", payload: data });
    status && navigate("/");

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
