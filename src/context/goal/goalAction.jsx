import React, { useReducer } from 'react';
import GoalReducer from './goalReducer';
import GoalContext from './goalContext';
import axios from 'axios';

const GoalAction = (props) => {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem('username')

    const initialState = {
      value: 'cycling',
      currentGoal:{name:"cycling",target:null},
      goals: [],
      error: [],
      goalLoading: false,
    };
  
    const [state, dispatch] = useReducer(GoalReducer, initialState);
    // set goalLoading
    const setLoading = () => {
      dispatch({ type: "SET_LOADING" });
    };
    const setCurrentGoal = (goal) => {
      dispatch({ type: "SET_CURRENT", payload: goal });
    };
  
    const setChartValue = (name) => {
      dispatch({ type: "SET_CHART", payload: name });
    };
  
    const addGoal = async (goals) => {
        const config = {
            headers: {
              token: token,
            },
          };
  console.log(goals);
      try {
        setLoading();
         const res=await axios.post(`https://fitness-logger.onrender.com/${username}/setgoal`,{"goals":goals},config);
                
         dispatch({
            type: "GET_GOALS",
            payload: [...res.data.goals],
          });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "GOAL_ERROR",
          payload: error.msg,
        });
      }
    };
  
    const getGoals = async (username,token) => {

      try {
        setLoading();
        const config = {
          headers: {
            token: token,
          },
        };
        const res = await axios.get(
          `https://fitness-logger.onrender.com/${username}/home`,
          config
        );

        dispatch({
          type: "GET_GOALS",
          payload: [...res.data.goals.goals],
        });
      } catch (error) {
  
        dispatch({
          type: "GOAL_ERROR",
          payload: error.response.data,
        });
      }


    };
  
    const updateGoals = async (goals) => {

        const config = {
            headers: {
              token: token,
            },
          };

      try {
        setLoading();
         const res=await axios.post(`https://fitness-logger.onrender.com/${username}/setgoal`,{"goals":goals},config);
        dispatch({
            type: "GET_GOALS",
            payload: [...res.data.goals],
          });
       
      } catch (error) {
       
        dispatch({
          type: "GOAL_ERROR",
          payload: error.msg,
        });
      }
    };
  
    const deleteGoals = async (goals) => {
     
        const config = {
            headers: {
              token: token,
            },
          };

      try {
        const res=await axios.post(`https://fitness-logger.onrender.com/${username}/setgoal`,{"goals":goals},config);
      
      
        dispatch({
            type: "GET_GOALS",
            payload: [...res.data.goals],
          });
      } catch (error) {
       
        dispatch({
          type: "GOAL_ERROR",
          payload: error.msg,
        });
      }
    };
  
    return (
      <GoalContext.Provider
        value={{
          goals: state.goals,
          value: state.value,
          error: state.error,
          goalLoading: state.goalLoading,
          currentGoal:state.currentGoal,
          addGoal,
          getGoals,
          updateGoals,
          deleteGoals,
          setChartValue,
          setCurrentGoal
        }}
      >
        {props.children}
      </GoalContext.Provider>
    );
  };



 export default GoalAction;