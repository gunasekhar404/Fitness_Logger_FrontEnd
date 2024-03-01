import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PostContext from "../context/post/postContext";

function createData(name, cycling, running, pullup, pushup, squat, plank) {
  return { name, cycling, running, pullup, pushup, squat, plank };
}

export default function DayTable() {

  const postcontext = useContext(PostContext);
  const { selectedPost} = postcontext;
  const [data, setData] = useState( {
    cycling: { duration: 0, distance: 0 },
    running: { duration: 0, distance: 0 },
    pullup: { reps: 0 },
    pushup: { reps: 0 },
    squat: { reps: 0 },

    plank: { duration: 0 },
  });
  const [localpost,setLocalpost]=useState(selectedPost)
  useEffect(() => {
    setLocalpost(selectedPost)
    setData( {
      cycling: { duration: 0, distance: 0 },
      running: { duration: 0, distance: 0 },
      pullup: { reps: 0 },
      pushup: { reps: 0 },
      squat: { reps: 0 },
  
      plank: { duration: 0 },
    });
  }, [selectedPost]);

  useEffect(() => { 
    localpost.forEach((post) => {
        if (post.name === "cycling") {
          const newdata = { ...data };
          const { cycling } = { ...newdata };
          cycling.duration += post.duration;
          cycling.distance += post.distance;
          setData(newdata);
        } else if (post.name === "running") {
          const newdata = { ...data };
          newdata.running.duration += post.duration;
          newdata.running.distance += post.distance;
          setData(newdata);
        } else if (post.name === "pullup") {
          const newdata = { ...data };
          newdata.pullup.reps += post.reps;
        } else if (post.name === "pushup") {
          const newdata = { ...data };
          newdata.pushup.reps += post.reps;
          setData(newdata);
        } else if (post.name === "squat") {
          const newdata = { ...data };
          newdata.squat.reps += post.reps;
          setData(newdata);
        } else if (post.name === "plank") {
          const newdata = { ...data };
          newdata.squat.duration += post.duration;
          setData(newdata);
        }
        return
      });
  
  }, [localpost]);

  const rows = [
    createData(
      "Duration:",
      `${data.cycling.duration}/min`,
      `${data.running.duration}/min`,
      "-",
      "-",
      "-",
      `${data.plank.duration}/min`
    ),
    createData(
      "Distance:",
      `${data.cycling.distance}/km`,
      `${data.running.distance}//km`,
      "-",
      "-",
      "-",
      "-"
    ),
    createData(
      "Reps:",
      "-",
      "-",
      data.pullup.reps,
      data.pushup.reps,
      data.squat.reps,
      "-"
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <caption>
          Your best result in longest time, longest distance and the most reps.
          Ever you done
        </caption>

        <TableHead>
          <TableRow>
            <TableCell>Exercises</TableCell>
            <TableCell align="right">Cycling</TableCell>
            <TableCell align="right">Running</TableCell>
            <TableCell align="right">Pull Up</TableCell>
            <TableCell align="right">Push UP</TableCell>
            <TableCell align="right">Squat</TableCell>
            <TableCell align="right">Plank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cycling}</TableCell>
              <TableCell align="right">{row.running}</TableCell>
              <TableCell align="right">{row.pullup}</TableCell>
              <TableCell align="right">{row.pushup}</TableCell>
              <TableCell align="right">{row.squat}</TableCell>
              <TableCell align="right">{row.plank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}