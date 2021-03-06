import React from "react";
import "./style.scss";
import UserInfo from "../UserInfo/UserInfo";
import { data } from "../../constants";

const TopNav = () => {
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topnav">
      <UserInfo user={data.user} />
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i class="bi bi-list"></i>
      </div>
    </div>
  );
};

export default TopNav;
