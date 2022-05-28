import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const UserInfo = ({ user }) => {
  const adminDetails = useSelector((state) => state.admin.admin);
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img src="https://joeschmoe.io/api/v1/random" alt="Hero Avatar" />
      </div>
      <div className="user-info__name">
        <span>{adminDetails?.name}</span>
      </div>
    </div>
  );
};

export default UserInfo;
