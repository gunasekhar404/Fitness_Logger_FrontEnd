import { 
    Paper,
    Skeleton,
     } from "@mui/material";
  import React from "react";
  import NavBar from "../components/navbar";
  
  function Notification() {
    return (
      <>
        <div className="container py-3">
          <div className="row text-white fs-4 mb-3">
            <div className="col">
              
              <NavBar panel={'NOTIFICATION'}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Paper>
                <Skeleton width="100%" height="80vh"></Skeleton>
              </Paper>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Notification;