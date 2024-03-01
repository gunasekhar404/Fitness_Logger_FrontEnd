import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import PostAction from "./context/post/postAction";
import GoalAction from "./context/goal/goalAction";
import DailyAction from "./context/daily/dailyAction";
import UserAction from "./context/user/userAction";
import MenuAction from "./context/menu/menuAction";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserAction>
    <PostAction>
      <GoalAction>
        <DailyAction>
          <MenuAction>
            <App />
          </MenuAction>
        </DailyAction>
      </GoalAction>
    </PostAction>
  </UserAction>
);