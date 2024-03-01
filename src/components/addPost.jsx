import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PostContext from "../context/post/postContext";

export default function AddPost({ add, handleAdd,selectedDate }) {
  const postcontext = React.useContext(PostContext);

  const { addPost, setCurrentPost, currentPost, } = postcontext;

  const handleChange = (e) => {
    // console.log(selectedDate);
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value,
      date: selectedDate?selectedDate:new Date(),
    });
  };
  const handleAddUpdate = () => {
    handleAdd(false);
    addPost(currentPost);
    setCurrentPost({name:"cycling"});

  };
  const handleCancel = () => {
    setCurrentPost({name:"cycling"});
    handleAdd(false);
  };

  return (
    <div>
      <Dialog
        open={add}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add your excersice here"}
        </DialogTitle>

        <FormControl variant="standard" sx={{ mx: 2, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Exercise
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="name"
            value={currentPost.name ? currentPost.name : "cycling"}
            onChange={(e) => handleChange(e)}
            label="Age"
          >
            <MenuItem value="cycling" name="cycling">
              Cycling
            </MenuItem>
            <MenuItem value="running" name="running">
              Running
            </MenuItem>
            <MenuItem value="pushup" name="pushup">
              Push Up
            </MenuItem>
            <MenuItem value="pullup" name="pullup">
              Pull Up
            </MenuItem>
            <MenuItem value="squat" name="squat">
              Squat
            </MenuItem>
            <MenuItem value="plank" name="plank">
              Plank
            </MenuItem>
          </Select>
        </FormControl>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please add your exercise final distance, time or reps
          </DialogContentText>
        </DialogContent>

        {currentPost.name === "cycling" || currentPost.name === "running" ? (
          <>
            <TextField
              id="standard-multiline-flexible"
              name="duration"
              label="Duration in min"
              margin="dense"
              maxRows={4}
              variant="standard"
              type="number"
              // value={currentPost.duration}
              onChange={(e) => handleChange(e)}
              sx={{ mx: 2 }}
            />

            <TextField
              id="standard-multiline-flexible"
              name="distance"
              label="Distance in km"
              type="number"
              margin="dense"
              maxRows={4}
              variant="standard"
              // value={currentPost.distance}
              onChange={(e) => handleChange(e)}
              sx={{ m: 2 }}
            />
          </>
        ) : (
          <TextField
            id="standard-multiline-flexible"
            name={currentPost.name === "plank"?"duration":"reps"}
            label={currentPost.name === "plank"?"Duration in min":"Number of Reps"}
            margin="dense"
            maxRows={4}
            variant="standard"
            type="number"
            // value={currentPost.duration}
            onChange={(e) => handleChange(e)}
            sx={{ mx: 2 }}
          />
        )}

        <DialogActions>
          <Button onClick={handleCancel}>CANCEL</Button>
          <Button onClick={handleAddUpdate} autoFocus>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}