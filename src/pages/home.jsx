import React, { useContext, useEffect } from "react";
import BmiCalculator from "../components/bmiCalculater";
import Graph from "../components/Graph";
import SpeedDialMenu from "../components/speedDial";
import PostContext from "../context/post/postContext";
import { Paper, Typography } from "@mui/material";
import Daily from "../components/daily";
import Gym from "../data/Gym.svg";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import ThreeDotLoading from "../components/Loading";

function Home() {
  const postContext = useContext(PostContext);
  const {getPosts,postLoading} = postContext

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    token && username ? <></> : navigate("/login");
    getPosts(username, token);
  }, []);

  return (
    <>
      <div className="container py-3 mx-auto" id="home">
        <div className="row text-white fs-4">
          <div className="col">
            <NavBar panel={"HOME"} />
          </div>
        </div>
        <div className="row mb-4" id="graph">
          <div className="col position-relative">
            <Graph />
            <div className="position-absolute bottom-0 end-0 translate-middle-x me-auto me-md-1 pe-md-1 me-xxl-5 pe-xxl-2">
              <SpeedDialMenu />
            </div>
          </div>
        </div>

        <div className="row ms-auto gy-4 ">
          <div className="col-8 col-sm-8 mx-auto col-md-4 col-lg-3">
            <BmiCalculator />
          </div>
          <div className="col-8 col-sm-8 col-md-4 mx-auto ">
            <Paper>
              <Daily />
            </Paper>
          </div>
          <div className="col-8 col-sm-8 col-md-4 mx-auto">
            <Paper>
              {/* <Skeleton height="40vh" width="100%" /> */}
              <img src={Gym} className="py-4" alt="" />
              <Typography variant="h5"> Hit the Gym! </Typography>
            </Paper>
          </div>
        </div>
      </div>
      <div className={postLoading ? "d-block" : "d-none"}>
        <ThreeDotLoading />
      </div>
    </>
  );
}

export default Home;