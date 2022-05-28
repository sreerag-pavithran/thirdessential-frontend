import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Checkbox } from "antd";
import { adminLogin, adminSignup, userLogin } from "../store/actions/auth";

import "./style.css";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginLoader = useSelector((state) => state.dashboard.loginLoader);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "",
  });
  const [err, setErr] = useState(false);
  const [admin, setAdmin] = useState(true);

  const handleSubmit = (data) => {
    console.log(admin);
    if (data === "login") {
      if (!formData?.email || !formData?.password) {
        return setErr(true);
      }
      dispatch({ type: "LOGIN_LOADER_ON" });
      if (admin === true) {
        dispatch(adminLogin(formData, navigate));
      } else {
        dispatch(userLogin(formData, navigate));
      }
      setErr(false);
    } else {
      if (
        !formData?.email ||
        !formData?.password ||
        !formData?.address ||
        !formData?.phone ||
        !formData?.name
      ) {
        return setErr(true);
      }
      dispatch({ type: "LOGIN_LOADER_ON" });
      dispatch(adminSignup(formData, navigate));
      setErr(false);
    }
  };

  return (
    <>
      <div className="section margin-top">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6
                  className="mb-0 pb-3"
                  style={{ textAlign: "center", marginTop: 20 }}
                >
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Email"
                              id="logemail"
                              autoComplete="off"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Password"
                              id="logpass"
                              autoComplete="off"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div
                            className="form-group mt-2"
                            style={{ marginBottom: 15 }}
                          >
                            <Checkbox onChange={() => setAdmin(!admin)}>
                              I'm a vendor
                            </Checkbox>
                          </div>
                          {err && (
                            <p style={{ color: "tomato" }}>
                              Please fill all fields!
                            </p>
                          )}
                          <Button
                            className="btn mt-4"
                            onClick={() => handleSubmit("login")}
                            loading={loginLoader}
                          >
                            Login
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Admin Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Name"
                              id="logname"
                              autoComplete="off"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logname"
                              className="form-style"
                              placeholder="Email"
                              id="logname"
                              autoComplete="off"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="phone"
                              name="logname"
                              className="form-style"
                              placeholder="Phone"
                              id="logname"
                              autoComplete="off"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="logemail"
                              className="form-style"
                              placeholder="Address"
                              id="logemail"
                              autoComplete="off"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Password"
                              id="logpass"
                              autoComplete="off"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Button
                            className="btn mt-4"
                            onClick={() => handleSubmit("signup")}
                            loading={loginLoader}
                          >
                            Create Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
