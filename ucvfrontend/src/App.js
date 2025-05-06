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


// Páginas internas del dashboard (puedes crear archivos reales luego)

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio: Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas del dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
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
