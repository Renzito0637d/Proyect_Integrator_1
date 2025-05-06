import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardLayout.css';
import ucvLogo from '../assets/logoucv.png';
import defaultUser from '../assets/logousuario.png'; // Icono predeterminado (debes agregar este)
import './DashboardLayout.css';

const DashboardLayout = () => {
    return (
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar bg-primary text-white p-4 vh-100"
          style={{
            width: '260px',
            boxShadow: '2px 0 6px rgba(0,0,0,0.1)'
          }}
        >
          <img
  src={ucvLogo}
  alt="UCV Logo"
  style={{
    width: '200px',
    height: 'auto',
    mixBlendMode: 'darken', 
    backgroundColor: 'transparent',
    border: 'none',
  }}
/>



          <ul className="nav flex-column">
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard">Dashboard</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/incidencias">Incidencias</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/categoria">Categoría</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/informe">Informe</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/departamento">Departamento</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/personal">Personal</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" style={{ fontSize: '1.1rem' }} to="/dashboard/asignar-personal">Asignar personal</Link>
  </li>
</ul>
        </div>
  
        {/* Main content */}
        <div className="flex-grow-1">
          <div
            className="d-flex justify-content-end align-items-center p-3 border-bottom bg-light"
            style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <img
              src={defaultUser}
              alt="User"
              className="rounded-circle me-2"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                backgroundColor: 'transparent'
              }}
            />
            <span>Usuario</span>
            <button className="btn btn-outline-secondary btn-sm ms-3">Cerrar sesión</button>
          </div>
  
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardLayout;
