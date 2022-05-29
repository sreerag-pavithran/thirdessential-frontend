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
    status && window.location.replace("/");

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const adminSignup = (adminData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/signup`,
      adminData,
      config
    );
    const {
      data: { status, message, data, access_token },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && localStorage.setItem("token", access_token);
    status && dispatch({ type: "ADMIN_DETAILS", payload: data });
    status && window.location.replace("/");

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const isLoggedIn = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchData = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/isloggedin`,
      { token },
      config
    );
    const {
      data: { status, data },
    } = fetchData;
    status &&
      dispatch({
        type: "ADMIN_DETAILS",
        payload: data,
      });

    const fetchUsers = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/users/fetch-users`,
      { token },
      config
    );
    const {
      data: {},
    } = fetchUsers;

    fetchUsers?.data?.status &&
      dispatch({
        type: "FETCH_USERS",
        payload: fetchUsers?.data?.data,
      });

    const fetchProducts = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/fetch-products`,
      { token },
      config
    );
    const {
      data: {},
    } = fetchProducts;

    fetchProducts?.data?.status &&
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: fetchProducts?.data?.data,
      });

    const fetchReport = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/fetch-report`,
      { token },
      config
    );
    const {
      data: {},
    } = fetchReport;

    fetchReport?.data?.status &&
      dispatch({
        type: "FETCH_REPORT",
        payload: fetchReport?.data?.data,
      });
  } catch (error) {
    notify.error("Session timed out. Please login again!");
    // window.location.replace("/auth");
  }
};

export const userLogin = (userData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const bodyData = {
      email: userData?.email,
      password: userData?.password,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/users/login`,
      bodyData,
      config
    );
    const {
      data: { status, message, data, access_token },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && localStorage.setItem("token", access_token);
    status && dispatch({ type: "USER_DETAILS", payload: data });
    status && dispatch({ type: "IS_VENDOR_ON" });
    status && localStorage.setItem("isVendor", true);
    status && localStorage.setItem("_id", data?._id);
    status && window.location.replace("/");

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const isLoggedInUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const _id = localStorage.getItem("_id");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchData = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/users/isloggedin`,
      { token, _id },
      config
    );
    const {
      data: { status, data },
    } = fetchData;
    status &&
      dispatch({
        type: "ADMIN_DETAILS",
        payload: data,
      });
    status &&
      dispatch({
        type: "USER_DETAILS",
        payload: data,
      });
    status &&
      dispatch({
        type: "IS_VENDOR_ON",
      });

    const fetchProducts = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/fetch-products`,
      { token, isVendor: true, _id },
      config
    );
    const {
      data: {},
    } = fetchProducts;

    fetchProducts?.data?.status &&
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: fetchProducts?.data?.data,
      });

    const fetchReport = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/fetch-report`,
      { token, isVendor: true, _id },
      config
    );
    const {
      data: {},
    } = fetchReport;

    fetchReport?.data?.status &&
      dispatch({
        type: "FETCH_REPORT",
        payload: fetchReport?.data?.data,
      });
  } catch (error) {
    notify.error("Session timed out. Please login again!");
    // window.location.replace("/auth");
  }
};
