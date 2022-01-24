import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Details from './pages/Details';
import Profile from './pages/Profile';

const AllRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
    </Router>
  );
};

export default AllRoute;
