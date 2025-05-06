import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import './App.css';
import Dashboard from './pages/Dashboard';
import Incidencias from './pages/Incidencias';
import Categoria from './pages/Categoria';
import Informe from './pages/Informe';
import Departamento from './pages/Departamento';
import Personal from './pages/Personal';
import AsignarPersonal from './pages/AsignarPersonal';
import PrivateRoute from './components/PrivateRoute';
import Registro from './components/Registro';

// Páginas internas del dashboard (puedes crear archivos reales luego)

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="incidencias" element={<Incidencias />} />
          <Route path="categoria" element={<Categoria />} />
          <Route path="informe" element={<Informe />} />
          <Route path="departamento" element={<Departamento />} />
          <Route path="personal" element={<Personal />} />
          <Route path="asignar-personal" element={<AsignarPersonal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
