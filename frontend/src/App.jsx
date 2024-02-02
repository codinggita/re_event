import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateNew from "./pages/CreateNew";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import EventPage from "./pages/EventPage";
import EventConfrom from "./pages/EventConfrom";
import ManageEvent from "./pages/ManageEvent";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMainDashContext } from "./context/AppContext";
import Cookies from "js-cookie";
import LoginNavbar from "./components/LoginNavBar";
import Checkin from './components/Manage/Checkin/Checkin';
import axios from 'axios';
import SmallProfile from "./components/Login/SmallProfile";
import MyEvents from "./pages/MyEvents";
import Profile from './pages/Profile';




function App() {
  const location = useLocation();
  const { profile, setProfile } = useMainDashContext();


  const hideNavbar = ['/manage/', '/create'];
  const shouldHideNavbar = hideNavbar.some((path) => location.pathname.includes(path));
  const hideFooter = ['/checkin'];
  const shouldHideFooter = hideFooter.some((path) => location.pathname.includes(path));


  const cookie = Cookies.get("user");

  return (
    <>
      <div className="w-full flex flex-col">
        {
          cookie ? (
            <>
              {!shouldHideNavbar ? <LoginNavbar /> : <SmallProfile />}
              <Routes>
                <Route path="/create" element={<CreateNew width={"75%"} saveName={"Create Event"} mt={"15%"} />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/e/:id" element={<EventPage />} />
                <Route path="/create/conform" element={<EventConfrom />} />
                <Route path="/manage/:id" element={<ManageEvent />} />
                <Route path="/e/:id" element={<EventPage />} />
                <Route path="/manage/:id/checkin" element={<Checkin />} />
                <Route path="/myEvents" element={<MyEvents />} />
                {/* <Route path="/manage" element={<EventConfrom/>} /> */}
                <Route path="/manage/:id" element={<ManageEvent />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </>
          ) : (
            <>
              {!shouldHideNavbar ? <Navbar /> : null}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </>
          )
          // )
        }

        <Toaster position="top-center" />
      </div>

      {!shouldHideFooter ? <Footer /> : null}
      {/* <Footer /> */}

    </>
  );
}

export default App;