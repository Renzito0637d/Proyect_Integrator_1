import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaTags,
  FaFileAlt,
  FaBuilding,
  FaUsers,
  FaUserPlus,
} from 'react-icons/fa';
import ReportFrom  from '../components/Report/ReportForm/ReportFrom';
import ReportTable from '../components/Report/ReportTable/ReportTable';

export default function Report() {
  return (
    <div className="main-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <Link to="/dashboard" className="sidebar-item">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link to="/incidencias" className="sidebar-item">
          <FaClipboardList />
          <span>Incidencias</span>
        </Link>
        <Link to="/categoria" className="sidebar-item">
          <FaTags />
          <span>Categoría</span>
        </Link>
        <Link to="/informe" className="sidebar-item">
          <FaFileAlt />
          <span>Informe</span>
        </Link>
        <Link to="/departamento" className="sidebar-item">
          <FaBuilding />
          <span>Departamento</span>
        </Link>
        <Link to="/personal" className="sidebar-item">
          <FaUsers />
          <span>Personal</span>
        </Link>
        <Link to="/asignar-personal" className="sidebar-item">
          <FaUserPlus />
          <span>Asignar</span>
        </Link>
      </div>

      {/* ===== ÁREA DE CONTENIDO ===== */}
      <div className="content-area">
        <ReportFrom />
        <ReportTable />
      </div>
    </div>
  );
}
