import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import sidebarNav from "../../configs/sidebarNav";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const isVendor = localStorage.getItem("isVendor");

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={images.logo} alt="" />
        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {isVendor === "true"
          ? sidebarNav.slice(0, 2).map((nav, index) => (
              <Link
                to={nav.link}
                key={`nav-${index}`}
                className={`sidebar__menu__item ${
                  activeIndex === index && "active"
                }`}
                onClick={closeSidebar}
              >
                <div className="sidebar__menu__item__icon">{nav.icon}</div>
                <div className="sidebar__menu__item__txt">{nav.text}</div>
              </Link>
            ))
          : sidebarNav.map((nav, index) => (
              <Link
                to={nav.link}
                key={`nav-${index}`}
                className={`sidebar__menu__item ${
                  activeIndex === index && "active"
                }`}
                onClick={closeSidebar}
              >
                <div className="sidebar__menu__item__icon">{nav.icon}</div>
                <div className="sidebar__menu__item__txt">{nav.text}</div>
              </Link>
            ))}
        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i class="bi bi-box-arrow-left"></i>
          </div>
          <div
            style={{
              fontFamilt: "Poppins",
              color: "#111",
              fontSize: 15,
              fontWeight: 400,
            }}
            className="sidebar__menu__item__txt"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isVendor");
              localStorage.removeItem("_id");
              window.location.replace("/auth");
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
