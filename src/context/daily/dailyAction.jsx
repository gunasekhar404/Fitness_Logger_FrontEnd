import React, { useReducer } from 'react';
import DailyReducer from "./dailyReducer"
import DailyContext from './dailyContext'
import axios from 'axios'



function DailyAction(props){
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
  

    const dailyInitialState = {
        daily: [],
        error: [],
        activity:'',
        time:new Date(),
        selectedDaily: [],
        loading: false,
      };
  
 const [state, dispatch] = useReducer(DailyReducer, dailyInitialState);


 const setLoading = () => {
  dispatch({ type: "SET_LOADING" });
};

const setActivity = (data) => {
  dispatch({ type: "SET_ACTIVITY",payload:data });
};
const setTime = (time) => {
  dispatch({ type: "SET_TIME",payload:time  });
};

const setSelectedDaily = (daily) => {
  dispatch({ type: "SET_SELECTEDDAILY",payload:daily  });
};

  
//get posts
  const getDaily = async () => {
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
// console.log(res);
      dispatch({
        type: "GET_DAILY",
        payload: [...res.data.daily],
      });
    } catch (error) {
      dispatch({
        type: "DAILY_ERROR",
        payload: error.response.data,
      });
    }
  };



  const addDaily = async (daily) => {
    try {
      setLoading();
      const config = {
        headers: {
          token: token,
        },
      };
      const res = await axios.post(
        `https://fitness-logger.onrender.com/${username}/setdaily`,daily,config);

      dispatch({
        type: "ADD_DAILY",
        payload: [...res.data],
      });
    } catch (error) {
     
      dispatch({
        type: "DAILY_ERROR",
        payload: error.response.data
      });
    }
  };




  const updateDaily = async (selectedDaily) => {

    try {
      setLoading();
      const config = {
        headers: {
          token: token,
        },
      };
      const res = await axios.put(
        `https://fitness-logger.onrender.com/${username}/updatedaily/${selectedDaily._id}`,selectedDaily,config);
// console.log(res);
      dispatch({
        type: "ADD_DAILY",
        payload: [...res.data],
      });
    } catch (error) {
     
      dispatch({
        type: "DAILY_ERROR",
        payload: error.response.data
      });
    }
  }


    const deleteDaily = async (id) => {
      try {
        setLoading();
        const config = {
          headers: {
            token: token,
          },
        };
        const res = await axios.delete(
          `https://fitness-logger.onrender.com/${username}/deletedaily/${id}`,config);

        dispatch({
          type: "ADD_DAILY",
          payload: [...res.data],
        });
      } catch (error) {
        console.log(error.response.data);
        dispatch({
          type: "DAILY_ERROR",
          payload: error.response.data
        });
      }







  };







  return (
    <DailyContext.Provider
      value={{
      daily: state.daily,
      error: state.error,
      selectedDaily: state.selectedDaily,
      loading: state.loading,
      activity: state.activity,
      time: state.time,
      getDaily,
      addDaily,
      deleteDaily,
      updateDaily,
      setActivity,
      setTime,
      setSelectedDaily
      }}
    >
      {props.children}
    </DailyContext.Provider>
  );

}

export default DailyAction;