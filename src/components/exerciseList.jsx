import React from 'react';

import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';



function ExerciseListItem({post,handleUpdate,handleDeletePost}) {
    const { _id, name,reps,duration,distance } = post;

    return ( <>
    <div className='container'>

    
    <Card  sx={{ display: 'flex',
    justifyContent: 'space-between',
    my:1,
    }}>
        <CardContent>
        <Typography
            color='textSecondary'
            gutterBottom
          >
            You done :{' '} 
            <Box component='span'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Box>
           {" "} {reps?reps+"reps":<></> }
           {' '} {duration?duration+"min":<></>}
           {" "}{distance?distance+"km":<></>}
           
          </Typography>
        </CardContent>
        <CardActions >
        <IconButton
            aria-label='delete'
           
            onClick={()=>handleDeletePost( _id)}
          >
            <DeleteForeverIcon/>
          </IconButton>
          <IconButton
            aria-label='edit'
         
            onClick={() => handleUpdate(post)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      </div>
    </> );
}

export default ExerciseListItem;