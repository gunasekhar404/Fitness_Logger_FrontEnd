import React, { Fragment, useContext, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ChartMixed from "./apexcharts/mixedChart";
import ChartSingle from "./apexcharts/singleChart";
import { Paper } from "@mui/material";
import Goal from "./goal";
import PostContext from "../context/post/postContext";
import GoalContext from "../context/goal/goalContext";

const Graph = () => {
  const postcontext = useContext(PostContext)
  const goalcontext = useContext(GoalContext)

  
  const {posts} = postcontext
  const {value,setChartValue,getGoals,goals}=goalcontext

  useEffect(()=>{
    getGoals(localStorage.getItem('username'),localStorage.getItem('token'))
  },[])

  const dataFunction = (type) => {
    const typeArr = posts.filter((post) => post.name === type).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const returnDistance = [];
    const returnDuration = [];
    const returnDurPlank = [];
    const returnReps = [];

    typeArr.forEach((val) => {
      if (val.name === 'cycling' || val.name === 'running') {
        returnDistance.push({ x: val.date + ' GMT', y: val.distance });
        returnDuration.push({ x: val.date + ' GMT', y: val.duration });
      } else if (
        val.name === 'pushup' ||
        val.name === 'pullup' ||
        val.name === 'squat'
      ) {
        returnReps.push({ x: val.date + ' GMT', y: val.reps });
      } else {
        returnDurPlank.push({ x: val.date + ' GMT', y: val.duration });
      }
    });

    if (returnReps !== []) {
      returnReps.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDuration !== []) {
      returnDuration.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDistance !== []) {
      returnDistance.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDurPlank !== []) {
      returnDurPlank.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    return { returnDistance, returnDuration, returnReps, returnDurPlank };
  };



  let chartTheme = "dark";

  let chartBackground = "#ffffff";


  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setChartValue(newValue);
  };
  const {
    returnDistance,
    returnDuration,
    returnReps,
    returnDurPlank,
  } = dataFunction(value);

  return (
    <Fragment>
      <Container>
        <Box
          component="div"
          sx={{
             display: "flex",
            flexDirection: "column",
            }}
        >
          <Fragment>
            <Paper
              elevation={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "50px",
                backgroundColor: " #424242",
                color: "#fff",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                aria-label="full width tabs example"
              >
                <Tab label="cycling" value="cycling" />
                <Tab label="running" value="running" />
                <Tab label="pushup" value="pushup" />
                <Tab label="pullup" value="pullup" />
                <Tab label="squat" value="squat" />
                <Tab label="plank" value="plank" />
              </Tabs>
            </Paper>
            <Paper
              elevation={4}
              sx={{
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                backgroundColor: " #424242",
              }}
            >
              {value === "cycling" && (
                <ChartMixed
                returnDistance={returnDistance}
                returnDuration={returnDuration}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value= "cycling" 
                goalTarget={(goals.find((goal)=>goal.name=== "cycling" ))&&(goals.find((goal)=>goal.name=== "cycling" )).target}
                // goalTarget={getGoalByTarget('cycling')}
                />
              )}
              {value === "running" && (
                <ChartMixed
                returnDistance={returnDistance}
                returnDuration={returnDuration}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value="running"
                goalTarget={(goals.find((goal)=>goal.name=== "running" ))&&(goals.find((goal)=>goal.name=== "running" )).target}
                
                />
              )}
              {value === "pushup" && (
                <ChartSingle
                returnReps={returnReps}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value="pushup"
                goalTarget={(goals.find((goal)=>goal.name==="pushup"))&&(goals.find((goal)=>goal.name=== "pushup" )).target}
               
                />
              )}
              {value === "pullup" && (
                <ChartSingle
                returnReps={returnReps}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value="pullup"
                goalTarget={(goals.find((goal)=>goal.name==="pullup"))&&(goals.find((goal)=>goal.name=== "pullup" )).target}
               
                />
              )}
              {value === "squat" && (
                <ChartSingle
                returnReps={returnReps}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value="squat"
                goalTarget={(goals.find((goal)=>goal.name==="squat"))&&(goals.find((goal)=>goal.name==="squat" )).target}
               
                />
              )}
              {value === "plank" && (
                <ChartSingle
                returnDurPlank={returnDurPlank}
                chartBackground={chartBackground}
                chartTheme={chartTheme}
                value="plank"
                goalTarget={(goals.find((goal)=>goal.name==="plank"))&&(goals.find((goal)=>goal.name=== "plank" )).target}
               
                />
              )}
            </Paper>
            <Paper
              elevation={4}
              sx={{
                borderTopLeftRadius: "0px",
                borderTopRighttRadius: "0px",
              }}
            >
              <Goal />
            </Paper>
          </Fragment>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Graph;