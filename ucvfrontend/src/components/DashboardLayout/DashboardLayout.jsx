import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardLayout.css';
import ucvLogo from '../../assets/logoucv.png';
import defaultUser from '../../assets/logousuario.png';
import ChatbotUCV from '../../components/Chatbot/Chatbot'; // <-- ajusta esta ruta

const DashboardLayout = () => {
  const [mostrarChat, setMostrarChat] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-primary text-white p-4 vh-100" style={{ width: '260px', boxShadow: '2px 0 6px rgba(0,0,0,0.1)' }}>
        <img src={ucvLogo} alt="UCV Logo" style={{ width: '200px', height: 'auto', mixBlendMode: 'darken', backgroundColor: 'transparent', border: 'none' }} />
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/incident">Incidencias</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/category">Categoría</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/report">Informe</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/department">Departamento</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/staff">Personal</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/dashboard/assignStaff">Asignar personal</Link></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 position-relative">
        <div className="d-flex justify-content-end align-items-center p-3 border-bottom bg-light" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <img src={defaultUser} alt="User" className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
          <span>Usuario</span>
          <button className="btn btn-outline-secondary btn-sm ms-3">Cerrar sesión</button>
        </div>

        <div className="container p-3">
          <Outlet />
        </div>

        {/* Botón flotante para abrir el chatbot con bordes suaves */}
        <button
          className="btn btn-primary"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '30px',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            zIndex: 1000,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            borderRadius: '8px',   // Bordes suaves
          }}
          onClick={() => setMostrarChat(prev => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-person-square"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
          </svg>
        </button>

        {/* Chatbot flotante */}
        {mostrarChat && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '30px',
              width: '360px',
              height: 'auto',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              zIndex: 1000,
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center bg-primary text-white p-2" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <span>Chatbot UCV</span>
              <button className="btn btn-sm btn-light" onClick={() => setMostrarChat(false)}>✖</button>
            </div>
            <div style={{ padding: '10px' }}>
              <ChatbotUCV />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
