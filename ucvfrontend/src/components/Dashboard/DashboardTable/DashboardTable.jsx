import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import './DashboardTable.css';

function DashboardTable() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/ucv/dashboardList')
      .then((response) => setDashboardData(response.data))
      .catch((error) => console.error(error));
  }, []);

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
        <Link to="/asignar-personal-tabla" className="sidebar-item">
          <FaUserPlus />
          <span>Asignar</span>
        </Link>
      </div>

      {/* ===== CONTENIDO DE LA TABLA ===== */}
      <div className="content-area">
        <h2 className="mb-4">Listado de Incidencias</h2>
        <div className="bg-light p-3 rounded border mt-4">
          <table className="table table-bordered text-center">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Incidente</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.estado}</td>
                  <td>{item.responsable}</td>
                  <td>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardTable;

