import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import './styles/App.css';
import Dashboard from './pages/Dashboard';
import Incident from './pages/Incident';
import Category from './pages/Category';
import Report from './pages/Report';
import Department from './pages/Department';
import Staff from './pages/Staff';
import AssignStaff from './pages/AssignStaff';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { Toaster } from 'sonner'

function App() {
  return (
    <>
    <Toaster position="bottom-left" richColors className='sonner-toast'/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- Agrega esta línea */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="incident" element={<Incident />} />
            <Route path="category" element={<Category />} />
            <Route path="report" element={<Report />} />
            <Route path="department" element={<Department />} />
            <Route path="staff" element={<Staff />} />
            <Route path="assignStaff" element={<AssignStaff />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
