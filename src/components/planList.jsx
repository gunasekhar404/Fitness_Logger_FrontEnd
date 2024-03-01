import {
    Box,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import React, { Fragment, useContext, useEffect, useState } from "react";
  import AddPost from "./addPost";
  import UpdatePost from "./updatePost";
  import ExerciseListItem from "./excerciseList";
  import PostContext from "../context/post/postContext";
  
  function PlanList() {
    const postcontext = useContext(PostContext);
    const {
      selectedDate,
      posts,
      getPosts,
      selectedPost,
      setSelectedPost,
      deletePost,
      setCurrentPost,
    } = postcontext;
  
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      if (posts.length === 0) getPosts(username, token);
    }, []);
  
    useEffect(() => {
      const select = posts.filter(
        (post) => new Date(post.date).toDateString() === selectedDate
      );
      setSelectedPost(select);
    }, [selectedDate,posts]);
  
    const handleUpdate = (post) => {
      setUpdate(true);
      setCurrentPost(post);
    };
  
    const cancelUpdate = (option) => {
      setUpdate(option);
    };
    const handleAdd = (option) => {
      setAdd(option);
    };
  
    const handleDeletePost = (id) => {
      deletePost(id);
    };
  
    return (
      <>
        <div>
          <Card sx={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>
              <Typography>Your selected day / {selectedDate}</Typography>
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => handleAdd(true)}
                aria-label="add"
                sx={{
                  "&:hover": {
                    color: "#64dd17",
                    backgroundColor: "yellow",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </CardActions>
          </Card>
  
          {selectedPost.length !== 0 ? (
            <Box component={"div"} sx={{ maxHeight: "350px", overflow: "auto" }}>
              {selectedPost.map((post) => (
                <ExerciseListItem
                  post={post}
                  handleUpdate={handleUpdate}
                  handleDeletePost={handleDeletePost}
                  key={post._id}
                />
              ))}
            </Box>
          ) : (
            <Fragment>
              <Card>
                <CardContent>
                  <Typography>
                    Is this your rest day? If not then push...
                  </Typography>
                </CardContent>
              </Card>
            </Fragment>
          )}
          <AddPost add={add} handleAdd={handleAdd} selectedDate={selectedDate} />
          <UpdatePost update={update} cancelUpdate={cancelUpdate} />
        </div>
      </>
    );
  }
  
  export default PlanList;