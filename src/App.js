import "./App.css";
import Home from "./pages/home";
import SideMeanu from "./components/sideMeanu";
import Planner from "./pages/planner";
import Notification from "./pages/notification";
import Club from "./pages/club";
import Setting from "./pages/setting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Welcome from "./pages/welcome";
import InvalidRoute from "./pages/invalidPage";
import ForgetPassword from "./pages/forgetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />

          <Route path="/:username/" element={<SideMeanu />}>
            <Route index element={<Home />} />
            <Route path="planner" element={<Planner />} />
            <Route path="notification" element={<Notification />} />
            <Route path="club" element={<Club />} />
            <Route path="settings" element={<Setting />} />
          </Route>

          <Route path="*" element={<InvalidRoute/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;