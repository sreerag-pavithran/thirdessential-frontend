import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout/MainLayout";

import "./scss/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
