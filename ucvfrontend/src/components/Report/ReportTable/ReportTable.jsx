import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportTable.css';

function ReportTable() {
  const [reports, setReports] = useState([
    {
      id: 1,
      accionesTomadas: 'Se reinició el sistema',
      estados: 'Terminado',
      personal: 'María López',
      descripcion: 'Problema de acceso',
      fecha: '2025-06-04',
    },
    {
      id: 2,
      accionesTomadas: 'Se cambió contraseña',
      estados: 'Derivado',
      personal: 'Carlos Ruiz',
      descripcion: 'Solicitud de usuario',
      fecha: '2025-06-03',
    },
    {
      id: 3,
      accionesTomadas: 'Actualización de software',
      estados: 'En proceso',
      personal: 'Ana Martínez',
      descripcion: 'Mejora de seguridad',
      fecha: '2025-06-05',
    },
  ]);

  const [sortBy, setSortBy] = useState('ID');

  const handleSort = () => {
    let sortedReports = [...reports];
    switch (sortBy) {
      case 'ID':
        sortedReports.sort((a, b) => a.id - b.id);
        break;
      case 'Acciones Tomadas':
        sortedReports.sort((a, b) => a.accionesTomadas.localeCompare(b.accionesTomadas));
        break;
      case 'Estados':
        sortedReports.sort((a, b) => a.estados.localeCompare(b.estados));
        break;
      case 'Personal':
        sortedReports.sort((a, b) => a.personal.localeCompare(b.personal));
        break;
      case 'Fecha':
        sortedReports.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        break;
      default:
        break;
    }
    setReports(sortedReports);
  };

  return (
    <div className="d-flex bg-light p-3 rounded border">
      {/* Tabla principal */}
      <div className="flex-grow-1 me-4">
        <table className="table table-bordered table-sm text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Acciones Tomadas</th>
              <th>Estados</th>
              <th>Personal</th>
              <th>Descripción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(({ id, accionesTomadas, estados, personal, descripcion, fecha }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{accionesTomadas}</td>
                <td>{estados}</td>
                <td>{personal}</td>
                <td>{descripcion}</td>
                <td>{fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel lateral derecho */}
      <div style={{ width: "220px" }}>
        <h6 className="fw-bold">Ordenar por</h6>
        <select
          className="form-select mb-2"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option>ID</option>
          <option>Acciones Tomadas</option>
          <option>Estados</option>
          <option>Personal</option>
          <option>Fecha</option>
        </select>
        <button className="btn btn-primary w-100" onClick={handleSort}>Ordenar</button>
      </div>
    </div>
  );
}

export default ReportTable;
