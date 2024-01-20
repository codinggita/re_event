import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNew from './pages/CreateNew';
import Dashboard from './pages/Dashboard';

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
      </div>

    </>
  )
}

export default App
