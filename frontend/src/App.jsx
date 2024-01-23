import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNew from './pages/CreateNew';
import Dashboard from './pages/Dashboard';
import {Toaster } from 'sonner';
import EventPage from './pages/EventPage';
import EventConfrom from './pages/EventConfrom';

function App() {
  return (
    <>
      <div className="w-full flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/e/:id" element={<EventPage/>} />
          <Route path="/create/conform" element={<EventConfrom/>} />
        </Routes>
        <Toaster position="top-center"/>
      </div>

    </>   
  )
}

export default App
