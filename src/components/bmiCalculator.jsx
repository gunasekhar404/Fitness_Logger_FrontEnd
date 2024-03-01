import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

function BmiCalculater() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  let calcBmi = (event) => {

    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * 10000;
      setBmi(bmi.toFixed(1));

      // Logic for message

      if (bmi < 25) {
        setMessage("You are underweight");
      } else if (bmi >= 25 && bmi < 30) {
        setMessage("You are a healthy weight");
      } else {
        setMessage("You are overweight");
      }
    }
  };

  let reload = (event) => {
    event.preventDefault();
    setWeight(0);
    setHeight(0);
    setBmi('')
  };

  return (
    <div className="bmiCalculater">
      <div className="container card p-4">
        <span className="fs-4 mb-3" >BMI Calculator</span>
        <form onSubmit={calcBmi}>
          <div className="d-flex flex-column gap-2 ">
            <div>
              <TextField
                label="enter your weight"
                id="outlined-start-adornment"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
                label="enter your height"
                id="outlined-start-adornment"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">cm</InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="btn-group mt-3">
            <button className="btn bg-success" type="submit">
              Submit
            </button>
            <button  className="btn bg-warning" onClick={reload} >
              Reload
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <span className="fs-3 fw-bold">Your BMI is: {bmi}</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default BmiCalculater;