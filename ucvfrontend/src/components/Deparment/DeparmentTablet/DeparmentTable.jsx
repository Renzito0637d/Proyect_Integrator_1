import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DeparmentTable.css'

function DeparmentTable() {
  // Datos iniciales
  const [departments, setDepartments] = useState([
    { id: 1, pabellon: 'A', piso: 2, salon: '305', fecha: '2025-06-04', area: 'Informática' },
    { id: 2, pabellon: 'B', piso: 1, salon: '102', fecha: '2025-05-20', area: 'Matemáticas' },
    { id: 3, pabellon: 'A', piso: 3, salon: '407', fecha: '2025-06-10', area: 'Física' },
    { id: 4, pabellon: 'B', piso: 2, salon: '210', fecha: '2025-04-15', area: 'Química' },
    { id: 5, pabellon: 'A', piso: 1, salon: '101', fecha: '2025-06-01', area: 'Biología' },
  ]);

  // Estado para el criterio seleccionado en el select
  const [sortBy, setSortBy] = useState('Nombre');

  // Función para ordenar
  const handleSort = () => {
    let sortedDepartments = [...departments];
    switch (sortBy) {
      case 'ID':
        sortedDepartments.sort((a, b) => a.id - b.id);
        break;
      case 'Nombre':
        sortedDepartments.sort((a, b) => a.area.localeCompare(b.area));
        break;
      case 'Fecha':
        sortedDepartments.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        break;
      case 'Piso':
        sortedDepartments.sort((a, b) => a.piso - b.piso);
        break;
      case 'Pabellón':
        sortedDepartments.sort((a, b) => a.pabellon.localeCompare(b.pabellon));
        break;
      default:
        break;
    }
    setDepartments(sortedDepartments);
  };

  return (
    <div className="d-flex bg-light p-3 rounded border">
      {/* Tabla principal */}
      <div className="flex-grow-1 me-4">
        <table className="table table-bordered table-sm text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Pabellón</th>
              <th>Piso</th>
              <th>Salón</th>
              <th>Fecha</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(({ id, pabellon, piso, salon, fecha, area }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{pabellon}</td>
                <td>{piso}</td>
                <td>{salon}</td>
                <td>{fecha}</td>
                <td>{area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filtro lateral derecho */}
      <div style={{ width: "200px" }}>
        <h6 className="fw-bold">Ordenar por</h6>
        <select
          className="form-select mb-2"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option>ID</option>          {/* Nueva opción */}
          <option>Nombre</option>
          <option>Fecha</option>
          <option>Piso</option>
          <option>Pabellón</option>
        </select>
        <button className="btn btn-primary w-100" onClick={handleSort}>Ordenar</button>
      </div>
    </div>
  );
}

export default DeparmentTable;
