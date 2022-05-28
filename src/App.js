import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Auth from "./Pages/Auth";

import "./scss/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
