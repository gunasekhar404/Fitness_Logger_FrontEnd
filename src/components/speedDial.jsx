import React, { useState, useContext } from "react";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

import { DirectionsBike } from "@mui/icons-material";
import { DirectionsRun } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment } from "react";

import PushUpIcon from '../data/pushUp.png';
import PullUpIcon from '../data/pullUp.png';
import SquatIcon from '../data/squat.svg';
import PlankIcon from '../data/plank.avif';
import AddPost from "./addPost";
import PostContext from "../context/post/postContext";

export const Squat=()=><img src={SquatIcon} width={'30px'} height={'30px'} alt="..." />
export const PushUp=()=><img src={PushUpIcon} width={'30px'} height={'30px'}  alt="..." />
export const PullUp=()=><img src={PullUpIcon} width={'30px'} height={'30px'} alt="..." />
export const Plank=()=><img src={PlankIcon} width={'30px'} height={'30px'}  alt="..." />

const SpeedDialMenu = () => {
  const [open, setOpen] = useState(false);
  const [add,setAdd]=useState(false)
  const postcontext = useContext(PostContext)
  const {setCurrentPost} = postcontext
 
  const actions = [
    {
      icon: <DirectionsBike />,
      name: "Cycling",

      operation: "cycling",
    },
    {
      icon: <DirectionsRun />,
      name: "Running",

      operation: "running",
    },
      {
        icon: <PullUp/>,
        name: 'Pull Up',

        operation: 'pullup',
      },
      {
        icon: <PushUp/>,
        name: 'Push Up',

        operation: 'pushup',
      },
  {
        icon: <Squat/>,
        name: 'Squat',

        operation: 'squat',
      },
      {
        icon: <Plank/>,
        name: 'Plank',

        operation: 'plank',
      }
  ];

  const handleAdd =(option)=>{

    setAdd(option)


  }


  return (<>
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial Icon "
        sx={{
          position: "relative",
          top: -50,
          right:0,
         
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              setCurrentPost({"name":action.operation});
              setAdd(true)
            }}
            
          />
        ))}
      </SpeedDial>
    </Fragment>
<AddPost add={add} handleAdd={handleAdd}/>
 </> );
};

export default SpeedDialMenu;