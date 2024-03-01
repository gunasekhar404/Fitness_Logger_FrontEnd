import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
export default function ImageAvatars() {
  const username = localStorage.getItem("username")
  return (

      <Avatar sx={{ bgcolor: deepOrange[500],width: 56, height: 56  }}>{username.slice(0,1)}</Avatar>
  );
}