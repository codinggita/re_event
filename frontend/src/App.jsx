import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNew from './pages/CreateNew';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'sonner';
import EventPage from './pages/EventPage';
import EventConfrom from './pages/EventConfrom';
import ManageEvent from './pages/ManageEvent';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  const hideNavbar = ['/manage/'];
  const shouldHideNavbar = hideNavbar.some((path) => location.pathname.includes(path));

  return (
    <>
      <div className="w-full flex flex-col">
        {!shouldHideNavbar ? <Navbar/> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/e/:id" element={<EventPage />} />
          <Route path="/create/conform" element={<EventConfrom />} />
          <Route path="/manage/:id" element={<ManageEvent />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
      <Footer />
    </>
  );
}

export default App;
