import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import PostContext from '../context/post/postContext';

export default function UpdatePost({update,cancelUpdate}) {


   const postcontext = useContext(PostContext);

  const { updatePost, setCurrentPost, currentPost, } = postcontext;


  const handleClose = () => {
    cancelUpdate(false)
    setCurrentPost({name:'cycling'})
  };
  
  const handleChange=(e)=>{
    setCurrentPost({...currentPost,[e.target.name]:e.target.value})
   
  }
  const handleUpdate = () => {
    updatePost(currentPost)
    cancelUpdate(false)
  };

  return (
    <div>
      <Dialog
        open={update}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"updating your excersice here"}
        </DialogTitle>
        

     
      <DialogContent>
    
          <DialogContentText id="alert-dialog-description">
          Please update your exercise final distance, time or reps
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
              defaultValue={currentPost.duration}
              onChange={(e) => handleChange(e)}
              sx={{ mx: 2 }}
            />

            <TextField
              id="standard-multiline-flexible"
              name="distance"
              label="Duration in km"
              type="number"
              margin="dense"
              maxRows={4}
              variant="standard"
              defaultValue={currentPost.distance}
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
            defaultValue={currentPost.name === "plank"?currentPost.duration:currentPost.reps}
            onChange={(e) => handleChange(e)}
            sx={{ mx: 2 }}
          />
        )}


      
        <DialogActions sx={{display:'flex',
    justifyContent:'space-around'}}>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleUpdate} autoFocus>
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}