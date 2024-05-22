import React from 'react';
import HomeLanding from './pages/HomeLanding';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessControl from './pages/AccessControl';
import SearchBusinessTrip from './pages/SearchBusinessTrip';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/accessControl" element={<AccessControl />} />
        <Route path="/businessTrip" element={<SearchBusinessTrip />} />
      </Routes>
    </Router>
  );
};

export default App;