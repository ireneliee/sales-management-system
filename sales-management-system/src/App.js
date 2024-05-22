import React from 'react';
import HomeLanding from './pages/HomeLanding';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessControl from './pages/AccessControl';
import SearchBusinessTrip from './pages/SearchBusinessTrip';
import PasscodeChange from './pages/PasscodeChange';
import CreateNewTrip from './pages/CreateNewTrip';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/accessControl" element={<AccessControl />} />
        <Route path="/businessTrip" element={<SearchBusinessTrip />} />
        <Route path="/passcodeChange" element={<PasscodeChange />} />
        <Route path="/newBusinessTrip" element={<CreateNewTrip/>} />
      </Routes>
    </Router>
  );
};

export default App;