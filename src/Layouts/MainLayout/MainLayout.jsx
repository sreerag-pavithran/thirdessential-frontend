import React from "react";
import "./main-layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import TopNav from "../../Components/TopNav/TopNav";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="main__content">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
