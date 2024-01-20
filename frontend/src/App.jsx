import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNew from './pages/CreateNew';
import Dashboard from './pages/Dashboard';
import {Toaster } from 'sonner';

function App() {
  return (
    <>
      <div className="w-full flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster position="top-center"/>
      </div>

    </>
  )
}

export default App
