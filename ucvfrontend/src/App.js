import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Dashboard    from './pages/Dashboard';
import Incidencias  from './pages/Incident';
import Category     from './pages/Category';
import Department   from './pages/Department';
import Report       from './pages/Report';
import Staff        from './pages/Staff';
import AssignStaff  from './pages/AssignStaff';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/incidencias"     element={<Incidencias />} />
        <Route path="/categoria"       element={<Category />} />
        <Route path="/departamento"    element={<Department />} />
        <Route path="/informe"         element={<Report />} />
        <Route path="/personal"        element={<Staff />} />
        <Route path="/asignar-personal" element={<AssignStaff />} />
      </Routes>
    </Router>
  );
}

export default App;

