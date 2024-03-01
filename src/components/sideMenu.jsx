import React, { useContext } from "react";
import "./components.css";
import { Link, Outlet } from "react-router-dom";
import ImageAvatars from "./avatar";
import MenuContext from "../context/menu/menuContext";


function SideMeanu() {
  const username =localStorage.getItem('username')

  const menuContext = useContext(MenuContext);
  const { menu } = menuContext;

  return (
    <>
     <div className="container d-none d-sm-block" id="sidemeanu">
     
     <div className= "row h-100">
       <div className="col my-auto h-50  rounded-5 meanubar  ">
         <ul className="nav flex-column justify-content-around h-100   ">
           <li className="nav-item rounded-circle">
             <Link to={`/${username}`}>
               <i className="fa-solid fa-bars-progress fa-sm"></i>
             </Link>
           </li>
           <li className="nav-item rounded-circle">
             <Link to="planner">
               <i className="fa-solid fa-street-view"></i>
             </Link>
           </li>
           <li className="nav-item rounded-circle">
             <Link to="notification">
               <i className="fa-solid fa-bell"></i>
             </Link>
           </li>

           <li className="nav-item rounded-circle">
             <Link to="club">
               <i className="fa-solid fa-users fa-xs"></i>
             </Link>
           </li>

           <li className="nav-item rounded-circle">
             <Link to="settings">
               <i className="fa-solid fa-gears fa-xs"></i>
             </Link>
           </li>
         </ul>
       </div>
     
     </div>
     <div className="avatar" >
             <ImageAvatars/>
     </div>
   </div>
      <div className={`container d-sm-none ${menu?"sidemenu_show":"sidemenu_hide"}`} id="sidemeanu">
     
        <div className= "row h-100">
          <div className="col my-auto h-50  rounded-5 meanubar  ">
            <ul className="nav flex-column justify-content-around h-100   ">
              <li className="nav-item rounded-circle">
                <Link to={`/${username}`}>
                  <i className="fa-solid fa-bars-progress fa-sm"></i>
                </Link>
              </li>
              <li className="nav-item rounded-circle">
                <Link to="planner">
                  <i className="fa-solid fa-street-view"></i>
                </Link>
              </li>
              <li className="nav-item rounded-circle">
                <Link to="notification">
                  <i className="fa-solid fa-bell"></i>
                </Link>
              </li>

              <li className="nav-item rounded-circle">
                <Link to="club">
                  <i className="fa-solid fa-users fa-xs"></i>
                </Link>
              </li>

              <li className="nav-item rounded-circle">
                <Link to="settings">
                  <i className="fa-solid fa-gears fa-xs"></i>
                </Link>
              </li>
            </ul>
          </div>
        
        </div>
        <div className="avatar" >
                <ImageAvatars/>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SideMeanu;