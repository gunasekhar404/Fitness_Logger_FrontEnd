import React, { useEffect } from "react";
import PlanList from "../components/planList";
import DonutChart from "../components/apexcharts/DonutChart";
import { Paper } from "@mui/material";
import DayTable from "../components/dayTable";
import NavBar from "../components/navbar";
import ScheduleDate from "../components/schedule";
import { useNavigate } from "react-router-dom";

const Planner = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    token && username ? <></> : navigate("/login");
  }, []);

  return (
    <div className="container mx-auto py-3" id="planner">
      <div className="row text-white fs-4  mb-3">
        <div className="col">
          <NavBar panel={"SCHEDULE"} />
        </div>
      </div>
      <div className="row">
        <div className="col-11  col-sm-10 col-md-8 col-lg-5 col-xl-4 position-relative pb-5  mx-auto ">
          <Paper elevation={3}>
            <ScheduleDate />
          </Paper>
        </div>
        <div className="col-12 col-md-12 col-lg-6 col-xl-7 mx-auto ">
          <Paper>
            <PlanList />
          </Paper>
        </div>
      </div>

      <div className="row gy-5 ms-auto  mt-md-auto mt-4">
        <div className="col-12  col-md-9 col-lg-5 col-xl-4 mx-auto">
          <Paper elevation={4}>
            <DonutChart />
          </Paper>
        </div>
        <div className="col-12  col-md-12 col-lg-7 col-xl mx-auto">
          <Paper>
            <DayTable />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Planner;