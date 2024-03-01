import React, {Fragment, useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import GoalContext from "../context/goal/goalContext";

export default function Goal() {
  const goalcontext = useContext(GoalContext);
  const {
    goals,
    value,
    updateGoals,
    deleteGoals,
    addGoal,
    setCurrentGoal,
    currentGoal,
  } = goalcontext;
// console.log(value);
  useEffect(() => {
    setCurrentGoal({ name: value, target: null });
    goals.forEach((element) => {
      if (element.name === value) {
        return setCurrentGoal(element);
      }
    });
  }, [value]);

  const handleFormChange = (e) => {
    // console.log(e.target.value);
    setCurrentGoal({ ...currentGoal, target: e.target.value });
  };

  const handleDeleteGoal = () => {
    const newGoals = goals.filter((goal) => goal.name !==value);
    // console.log(newGoals);
    deleteGoals(newGoals);
  };
  const handleAdd = (e) => {
    goals.push(currentGoal);
    addGoal(goals);
  };
  const handleUpdate = () => {
    const newGoals = goals.map((goal) => goal.name === value?  goal = currentGoal:goal
    );
    // console.log(newGoals);
    updateGoals(newGoals);
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          sx={{
            bgcolor: " #424242",
            color: "#fff",
            borderTopLeftRadius: "0px",
            borderTopRighttRadius: "0px",
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add your Goal</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderTopLeftRadius: "0px",
            borderTopRighttRadius: "0px",
          }}
        >
          <div className="d-flex justify-content-start">
            <TextField
              id="target"
              name="target"
              label="Goal"
              type="number"
              focused
              value={currentGoal.target ? currentGoal.target : ""}
              onChange={handleFormChange}
            />
            {goals.find((goal) => goal.name === value) ? (
              <Fragment>
                {" "}
                <Button onClick={handleUpdate} className="ms-auto">
                  Update
                </Button>
                <Button onClick={handleDeleteGoal}>Delete</Button>{" "}
              </Fragment>
            ) : (
              <Button onClick={handleAdd}>Add</Button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}