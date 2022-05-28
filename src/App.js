import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";

import "./scss/App.scss";
import Auth from "./Pages/Auth";
import Users from "./Pages/Users";
import PrivateRoute from "./Routes/PrivateRoute";

import "bootstrap-icons/font/bootstrap-icons.css";
import "antd/dist/antd.css";
import "./index.css";

import { isLoggedIn } from "./store/actions/auth";

function App() {
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(isLoggedIn(token));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
