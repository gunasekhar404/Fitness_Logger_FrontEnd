import React from "react";
import "./components.css";

const ThreeDotLoading = () => {
  return (
    <div className="loading-dots text-white" id="loading">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <h4 className="text-center">connecting to the server</h4>
    </div>
  );
};

export default ThreeDotLoading;