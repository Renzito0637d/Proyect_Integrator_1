import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaTags,
  FaFileAlt,
  FaBuilding,
  FaUsers,
  FaUserPlus,
} from 'react-icons/fa';
import './DashboardLayout.css';
import ucvLogo from '../../assets/logoCompleto.png';
import defaultUser from '../../assets/logousuario.png';
import ChatbotUCV from '../../components/Chatbot/Chatbot'; // <-- ajusta esta ruta
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DashboardLayout = () => {
  const [mostrarChat, setMostrarChat] = useState(false);

  const [registeredUser, setRegisteredUser] = useState("");
  const [userRole, setUserRole] = useState(""); // Nuevo estado para el rol

  useEffect(() => {
    // Decodifica el JWT para obtener el nickname y el rol
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.sub) setRegisteredUser(payload.sub);
        else setRegisteredUser("");
        if (payload.role) setUserRole(payload.role);
        else setUserRole("");
      } catch {
        setRegisteredUser("");
        setUserRole("");
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setRegisteredUser("");
    navigate("/");
  };

  useEffect(() => {
  const handleUnload = () => {
    localStorage.removeItem("token");
  };
  window.addEventListener("beforeunload", handleUnload);
  return () => window.removeEventListener("beforeunload", handleUnload);
}, []);

  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#sidebar-home',
          popover: {
            title: 'Inicio',
            description: 'Aquí puedes volver al panel principal.',
          },
        },
        {
          element: '#sidebar-incident',
          popover: {
            title: 'Incidencias',
            description: 'Gestiona y revisa las incidencias reportadas.',
          },
        },
        {
          element: '#sidebar-category',
          popover: {
            title: 'Categorias',
            description: 'Gestiona y revisa los tipos de incidencia.',
          },
        },
        {
          element: '#sidebar-report',
          popover: {
            title: 'Informe',
            description: 'Realizacion de informes.',
          },
        },
        {
          element: '#sidebar-deparment',
          popover: {
            title: 'Departamento',
            description: 'Gestiona y revisa los departamentos regitrados.',
          },
        },
        {
          element: '#sidebar-staff',
          popover: {
            title: 'Personal',
            description: 'Gestiona y revisa el personal registrado.',
          },
        },
        {
          element: '#sidebar-assignStaff',
          popover: {
            title: 'Asignar Personal',
            description: 'Gestiona y revisa el seguimiento de la posible solucion a la incidencia.',
          },
        },
        {
          element: '#sidebar-chatbot-btn',
          popover: {
            title: 'Chatbot',
            description: 'Haz clic aquí para abrir el chatbot de ayuda.',
          },
        },
        {
          element: '#user-profile',
          popover: {
            title: 'Usuario',
            description: 'Aquí puedes ver tu perfil y cerrar sesión.',
          },
        },
      ],
    });

    driverObj.drive();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Cierra el sidebar al hacer clic fuera en móvil
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains('hamburger-btn')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Evita scroll cuando el sidebar está abierto en móvil
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Función para saber si el botón debe estar deshabilitado para USER
  const isDisabledForUser = (section) => {
    if (userRole === "ADMIN") return false;
    // Solo permite Home, Incident y Category para USER
    return !["home", "incident", "category"].includes(section);
  };

  return (
    <div className="d-flex">
      {/* Botón hamburguesa solo visible en móvil */}
      <button
        className="hamburger-btn d-md-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
          zIndex: 1201,
          fontSize: '28px',
          background: 'midnightblue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '6px 10px',
          display: 'inline-block',
        }}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Overlay oscuro cuando el sidebar está abierto en móvil */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay d-md-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1200,
          }}
        />
      )}

      <div
        ref={sidebarRef}
        className={`sidebar${sidebarOpen ? ' active' : ''}`}
        style={{
          // En móvil, el sidebar está por encima del contenido
          zIndex: sidebarOpen ? 1202 : 1000,
          position: 'fixed',
        }}
      >
        <ul onClick={handleSidebarLinkClick}>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <img src={ucvLogo} alt="UCV Logo" style={{ width: '119px', height: 'auto', border: 'none' }} />
            </Link>
          </li>
          <li className="nav-item" id="sidebar-home">
            <Link className="nav-link text-white" to="/dashboard">
              <FaTachometerAlt size={27} />
              <span className='item-txt'>Home</span>
            </Link>
          </li>
          <li className="nav-item" id="sidebar-incident">
            <Link className="nav-link text-white" to="/dashboard/incident">
              <FaClipboardList size={27} />
              <span className='item-txt'>Incidencias</span>
            </Link>
          </li>
          <li className="nav-item" id='sidebar-category'>
            <Link className="nav-link text-white" to="/dashboard/category">
              <FaTags size={27} />
              <span className='item-txt'>Categoría</span>
            </Link>
          </li>
          <li
            className={`nav-item${isDisabledForUser("report") ? " disabled" : ""}`}
            id='sidebar-report'
            style={isDisabledForUser("report") ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            <Link className="nav-link text-white" to="/dashboard/report" tabIndex={isDisabledForUser("report") ? -1 : 0}>
              <FaFileAlt size={27} />
              <span className='item-txt'>Informe</span>
            </Link>
          </li>
          <li
            className={`nav-item${isDisabledForUser("deparment") ? " disabled" : ""}`}
            id='sidebar-deparment'
            style={isDisabledForUser("deparment") ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            <Link className="nav-link text-white" to="/dashboard/department" tabIndex={isDisabledForUser("deparment") ? -1 : 0}>
              <FaBuilding size={27} />
              <span className='item-txt'>Departamento</span>
            </Link>
          </li>
          <li
            className={`nav-item${isDisabledForUser("staff") ? " disabled" : ""}`}
            id='sidebar-staff'
            style={isDisabledForUser("staff") ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            <Link className="nav-link text-white" to="/dashboard/staff" tabIndex={isDisabledForUser("staff") ? -1 : 0}>
              <FaUsers size={27} />
              <span className='item-txt'>Personal</span>
            </Link>
          </li>
          <li
            className={`nav-item${isDisabledForUser("assignStaff") ? " disabled" : ""}`}
            id='sidebar-assignStaff'
            style={isDisabledForUser("assignStaff") ? { pointerEvents: "none", opacity: 0.5 } : {}}
          >
            <Link className="nav-link text-white" to="/dashboard/assignStaff" tabIndex={isDisabledForUser("assignStaff") ? -1 : 0}>
              <FaUserPlus size={27} />
              <span className='item-txt'>Asignar personal</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div
        className="container-fluid flex-grow-1 position-relative"
        style={{
          marginLeft: '80px',
          transition: 'margin-left .75s ease',
        }}
      >
        <div className="d-flex justify-content-end align-items-center p-3 border-bottom bg-light" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} id="user-profile">
          <img src={defaultUser} alt="User" className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
          <span>{registeredUser ? registeredUser : "Usuario"}</span>
          <button className="btn btn-outline-secondary btn-sm ms-3" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <div className="container-fluid p-3">
          <Outlet />
        </div>

        {/* Botón flotante para abrir el chatbot con bordes suaves */}
        <button
          className="btn btn-primary"
          id="sidebar-chatbot-btn"
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
            borderRadius: '8px',
          }}
          onClick={() => setMostrarChat(prev => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-person-square noM"
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
