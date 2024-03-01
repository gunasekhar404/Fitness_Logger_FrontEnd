import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddDaily from "./addDaily";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DailyContext from "../context/daily/dailyContext";

const style = {
  width: "100%",
  maxHeight: 280,
  bgcolor: "background.paper",
  overflow: "auto",
};

export default function Daily() {
  const exampleList = [
    { activity: "example", date: new Date().toDateString() },
    { activity: "add yours", date: new Date().toDateString() },
    { activity: "Running", date: new Date().toDateString() },
    { activity: "Hit the gym", date: new Date().toDateString() },
    { activity: "Drink water", date: new Date().toDateString() },
    { activity: "have breakfast", date: new Date().toDateString() },
  ];

  const dailycontext = useContext(DailyContext);

  const {
    getDaily,
    daily,
    setActivity,
    deleteDaily,
    setSelectedDaily,
  } = dailycontext;
  useEffect(() => {
    getDaily();
  }, []);

  const [select, setSelect] = useState();
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setSelect("add");
    setAdd(true);
  };
  const cancelAdd = () => {
    setAdd(false);
  };

  const onDelete = (id) => {
    deleteDaily(id);
  };

  const onEdit = (list) => {
    setSelectedDaily(list);
    setSelect("edit");
    setActivity(list.activity);
    setAdd(true);
  };

  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardContent>
          <Typography paddingTop={1} variant="h5" component="div">
            Daily
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleAdd}
            aria-label="add"
            sx={{
              "&:hover": {
                color: "#64dd17",
                backgroundColor: "greenyellow",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
      <AddDaily add={add} cancelAdd={cancelAdd} select={select} />
      <List sx={style} component="nav" aria-label="mailbox folders">
        {daily.length !== 0
          ? daily.map((lists, index) => (
              <ListItem button divider key={index}>
                <ListItemText
                  primary={lists.activity}
                  secondary={
                    "today " + new Date(lists.date).toLocaleTimeString()
                  }
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(lists._id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => onEdit(lists)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
            ))
          : exampleList.map((lists, index) => (
              <ListItem button divider key={index}>
                <ListItemText
                  primary={lists.activity}
                  secondary={
                    "today " + new Date(lists.date).toLocaleTimeString()
                  }
                />
              </ListItem>
            ))}
      </List>
    </>
  );
}