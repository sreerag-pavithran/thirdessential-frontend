import React from "react";
import { Bar } from "react-chartjs-2";
import Box from "../Components/Box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../Components/DashboardWrapper/DashboardWrapper";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../Components/SummaryBox/SumamryBox";
import { colors, data } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OverallList from "../Components/OverallList/OverallList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row">
              {data.summary.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="col-6 col-md-6 col-sm-12 mb"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardWrapperMain>
      <DashboardWrapperRight>
        <div className="title mb">Overall</div>
        <div className="mb">
          <OverallList />
        </div>
      </DashboardWrapperRight>
    </DashboardWrapper>
  );
};

export default Dashboard;
