import React, { useReducer } from "react";
import PostReducer from "./postReducer";
import PostContext from "./postContext";
import axios from "axios";

function PostAction(props) {
  const postInitialState = {
    posts: [],
    error: [],
    currentPost: { name: "cycling" },
    selectedPost: [],
    selectedDate: new Date().toDateString(),
    postLoading: false,
  };
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [postState, dispatch] = useReducer(PostReducer, postInitialState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  // add post
  const addPost = async (post) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    try {
      const res = await axios.post(
        `https://fitness-logger.onrender.com/${username}/addpost`,
        post,
        config
      );
      dispatch({
        type: "ADD_POST",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data,
      });
    }
  };

  //get posts
  const getPosts = async (username, token) => {
    setLoading();
    try {
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
        type: "GET_POSTS",
        payload: [...res.data.post],
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data,
      });
    }
  };

  //update post
  const updatePost = async (post) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    try {
      const res = await axios.put(
        `https://fitness-logger.onrender.com/${username}/updatepost/${post._id}`,
        post,
        config
      );
      dispatch({
        type: "UPDATE_POST",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data,
      });
    }
  };

  //SET current post
  const setCurrentPost = (post) => {
    dispatch({ type: "SET_CURRENT", payload: post });
  };

  // delete post
  const deletePost = async (id) => {
    setLoading();
    const config = {
      headers: {
        token: token,
      },
    };

    try {
      await axios.delete(
        `https://fitness-logger.onrender.com/${username}/deletepost/${id}`,
        config
      );

      dispatch({
        type: "DELETE_POST",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data,
      });
    }
  };

  // set selected
  const setSelectedPost = (post) => {
    dispatch({ type: "SET_SELECTED_POST", payload: post });
  };

  // set selected
  const setSelectedDate = (date) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  return (
    <PostContext.Provider
      value={{
        posts: postState.posts,
        error: postState.error,
        currentPost: postState.currentPost,
        selectedPost: postState.selectedPost,
        postLoading: postState.postLoading,
        selectedDate: postState.selectedDate,
        setLoading,
        getPosts,
        addPost,
        setCurrentPost,
        setSelectedDate,
        setSelectedPost,
        deletePost,
        updatePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export default PostAction;