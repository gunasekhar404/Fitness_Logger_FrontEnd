import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import DailyContext from '../context/daily/dailyContext';


export default function AddDaily({add,cancelAdd,select}) {


const dailycontext = useContext(DailyContext);

const { updateDaily,setActivity,activity,time,setTime,selectedDaily,addDaily} = dailycontext;


  const handleClose = () => {
    cancelAdd();
  };
  const handleChange = (e) => {
    // console.log( e.target.value );
    setActivity( e.target.value );
  };

 const handleTime=(e)=>{
  setTime(e.$d)
 } 
const handleUpdateTime=()=>{

if(select==='add'){
   activity.length!==0 && addDaily({activity:activity,date:time});
}
if(select === 'edit'){
  selectedDaily.activity=activity;
  selectedDaily.date = time
  updateDaily(selectedDaily)
}
  
  cancelAdd()
}
  return (
    <div>
      <Dialog
        open={add}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"updating your Daily's here"}
        </DialogTitle>
        

     
      <DialogContent>
    
          <DialogContentText id="alert-dialog-description">
          Add the time and the activity here Ex:run-5am
          </DialogContentText>
      </DialogContent>
      
           
<TextField

          id="standard-multiline-flexible"
          name='event'
           label='event'
          margin='dense'
          maxRows={4}
          variant="standard"
          type='text'
          value={activity}
            onChange={(e)=>handleChange(e)}
          sx={
            {mx:2}
          }
        />

<LocalizationProvider dateAdapter={AdapterDayjs} >
   
        <TimePicker defaultValue={dayjs} label="Basic time picker" onChange={(e)=>handleTime(e)}  sx={
            {m:2}
          } />
   
    </LocalizationProvider>


      
        <DialogActions sx={{display:'flex',
    justifyContent:'space-around'}}>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleUpdateTime} autoFocus>
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}