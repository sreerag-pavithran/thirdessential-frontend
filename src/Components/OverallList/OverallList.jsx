import React from "react";
import "./style.scss";
import { data } from "../../constants";
import { useSelector } from "react-redux";

const icons = [<i class="bi bi-box-seam"></i>, <i class="bi bi-people"></i>];

const OverallList = () => {
  const report = useSelector((state) => state.dashboard.report);
  return (
    <ul className="overall-list">
      {report.slice(0, 2).map((item, index) => (
        <li className="overall-list__item" key={`overall-${index}`}>
          <div className="overall-list__item__icon">{icons[index]}</div>
          <div className="overall-list__item__info">
            <div className="title">{item.value}</div>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OverallList;
