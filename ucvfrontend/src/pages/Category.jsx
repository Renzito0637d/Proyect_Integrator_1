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
import CategoryForm from '../components/Category/CategoryForm/CategoryForm';
import CategoryTable from '../components/Category/CategoryTable/CategoryTable';


const Category = () => {
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
        <CategoryForm />
        <CategoryTable />
      </div>
    </div>
  );
};

export default Category;
