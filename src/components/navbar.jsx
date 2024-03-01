import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import MenuContext from "../context/menu/menuContext";

function NavBar({ panel }) {
  const navigate = useNavigate();

  const menuContext = useContext(MenuContext);
  const { menu, setToggle } = menuContext;

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#424242" }}>
          <Toolbar sx={{ dispaly: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{ display: { xs: "block", sm: "none" }, cursor: "pointer" }}
              onClick={setToggle}
            >
              {menu ? <CloseIcon /> : <MenuIcon />}
            </Box>

            <Typography variant="h6" color="inherit" component="div">
              {panel}
            </Typography>
            <LogoutIcon sx={{ cursor: "pointer" }} onClick={handleClick} />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;