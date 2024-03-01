import React, { useReducer } from "react";
import UserReducer from "./userReducer";
import UserContext from "./userContext";
import axios from "axios";

function UserAction(props) {
  const userInitial = {
    user: {},
    error: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(UserReducer, userInitial);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const login = async (userdata) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const res = await axios.post(
        "https://fitness-logger.onrender.com/login",
        userdata
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user["firstname"]);

      dispatch({
        type: "GET_USER",
        payload: res.data.user,
      });
      res?.data && dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response,
      });
      dispatch({ type: "LOADING", payload: false });
    }
  };

  const getUser = async () => {
    const config = {
      headers: {
        token: token,
      },
    };
    dispatch({ type: "LOADING", payload: true });
    try {
      const res = await axios.get(
        `https://fitness-logger.onrender.com/${username}/getuser`,
        config
      );

      dispatch({
        type: "GET_USER",
        payload: res.data,
      });
      res?.data && dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response,
      });
      dispatch({ type: "LOADING", payload: false });
    }
  };

  const updateUser = async (userdata, username, token) => {
    const config = {
      headers: {
        token: token,
      },
    };
    try {
      const res = await axios.put(
        `https://fitness-logger.onrender.com/${username}/update`,
        userdata,
        config
      );
      dispatch({
        type: "GET_USER",
        payload: { ...res.data },
      });

      localStorage.setItem("username", res.data["firstname"]);
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.response,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loading:state.loading,
        login,
        updateUser,
        getUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserAction;