import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const UserInfo = ({ user }) => {
  const adminDetails = useSelector((state) => state.admin.admin);
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img
          src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
          alt="Hero Avatar"
        />
      </div>
      <div className="user-info__name">
        <span>{adminDetails?.name}</span>
      </div>
    </div>
  );
};

export default UserInfo;
