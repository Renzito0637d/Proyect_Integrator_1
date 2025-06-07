import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBug,
  FaTags,
  FaFileAlt,
  FaBuilding,
  FaUsers,
  FaUserPlus,
} from 'react-icons/fa';
import './DashboardForm.css';

function DashboardForm() {
  const [formData, setFormData] = useState({
    incidencia: '',
    empleado: '',
    fechaSolucion: '',
    estado: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    // lógica de envío
  };

  return (
    <div className="main-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <Link to="/dashboard" className="sidebar-item">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link to="/incidencias" className="sidebar-item">
          <FaBug />
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

      {/* ===== CONTENIDO ===== */}
      <div className="content-area">
        <h2 className="mb-4">Asignar Personal</h2>
        <div className="bg-light p-3 rounded border mb-3">
          <div className="d-flex flex-wrap gap-3 mb-3">
            <div className="flex-fill">
              <label className="fw-medium">Incidencias</label>
              <select
                name="incidencia"
                className="form-select"
                value={formData.incidencia}
                onChange={handleChange}
              >
                <option value="">[Seleccionar]</option>
                <option value="db_utp">
                  Se filtró la base de datos de la UTP
                </option>
                {/* ...otras opciones */}
              </select>
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Empleado asignado</label>
              <select
                name="empleado"
                className="form-select"
                value={formData.empleado}
                onChange={handleChange}
              >
                <option value="">[Seleccionar]</option>
                <option value="ana.fuentes.1">ana.fuentes.1</option>
                {/* ...otras opciones */}
              </select>
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Día de solución</label>
              <input
                type="date"
                name="fechaSolucion"
                className="form-control"
                value={formData.fechaSolucion}
                onChange={handleChange}
              />
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Estado</label>
              <select
                name="estado"
                className="form-select"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="">[Seleccionar]</option>
                <option value="EN PROCESO">EN PROCESO</option>
                <option value="RESUELTO">RESUELTO</option>
                <option value="PENDIENTE">PENDIENTE</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-danger" onClick={handleSubmit}>
              Registrar
            </button>
            <button className="btn btn-primary">Consultar</button>
            <button className="btn btn-secondary">Actualizar</button>
            <button className="btn btn-warning">Eliminar</button>
            <button className="btn btn-success">Ver primero</button>
            <button className="btn btn-warning">Ver último</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardForm;
