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

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/fetch-single-product`,
      { id },
      config
    );
    const {
      data: { status, message, data },
    } = res;
    status && dispatch({ type: "FETCH_SINGLE_PRODUCT", payload: data });
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    console.log(productData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/create-product`,
      productData,
      config
    );
    const {
      data: { status, message, data },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && dispatch({ type: "FETCH_PRODUCTS", payload: data });
    status && dispatch({ type: "HIDE_MODAL" });

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const updateProduct = (productData) => async (dispatch) => {
  try {
    console.log(productData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/update-product`,
      productData,
      config
    );
    const {
      data: { status, message, data },
    } = res;

    res.status && dispatch({ type: "LOADER_OFF" });
    status && dispatch({ type: "FETCH_PRODUCTS", payload: data });
    status && dispatch({ type: "HIDE_MODAL_UPDATE" });

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};

export const deleteProduct = (productData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/admin/delete-product`,
      productData,
      config
    );
    const {
      data: { status, message, data },
    } = res;

    res.status && dispatch({ type: "LOGIN_LOADER_OFF" });
    status && dispatch({ type: "FETCH_PRODUCTS", payload: data });

    if (status) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.log("🤞HurraY ERROR", error);
  }
};
