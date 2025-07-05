import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DeparmentTable.css'

function DeparmentTable({ departmentList = [] }) {
  const [sortBy, setSortBy] = useState('ID');
  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterTower, setFilterTower] = useState('');
  const [filterFloor, setFilterFloor] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
    let list = [...departmentList];

    // Filtrado
    if (filterId) {
      list = list.filter(dep => String(dep.id).includes(filterId));
    }
    if (filterName) {
      list = list.filter(dep => dep.name && dep.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterTower) {
      list = list.filter(dep => dep.tower === filterTower);
    }
    if (filterFloor) {
      list = list.filter(dep => String(dep.floor) === filterFloor);
    }

    // Ordenamiento
    list.sort((a, b) => {
      switch (sortBy) {
        case 'ID':
          return a.id - b.id;
        case 'Nombre':
          return (a.name || '').localeCompare(b.name || '');
        case 'Fecha':
          return new Date(a.registeredDate) - new Date(b.registeredDate);
        case 'Piso':
          return a.floor - b.floor;
        case 'Pabellón':
          return (a.tower || '').localeCompare(b.tower || '');
        default:
          return 0;
      }
    });

    setFilteredDepartments(list);
  }, [departmentList, sortBy, filterId, filterName, filterTower, filterFloor]);

  return (
    <>
      <div className="d-flex flex-wrap bg-light p-3 rounded border col-12 gap-2">
        {/* Ordenamiento */}
        <div className="col-12 col-md-3 mt-md-0" style={{ width: "200px" }}>
          <h6 className="fw-bold">Ordenar por</h6>
          <select
            className="form-select mb-2"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option>ID</option>
            <option>Nombre</option>
            <option>Fecha</option>
            <option>Piso</option>
            <option>Pabellón</option>
          </select>
          <button
            className="btn btn-outline-secondary w-100 mb-2 mt-2"
            onClick={() => {
              setFilterId('');
              setFilterName('');
              setFilterTower('');
              setFilterFloor('');
            }}
          >
            Limpiar
          </button>
          <div className='d-flex gap-2 flex-column'>
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por Nombre"
              value={filterName}
              onChange={e => setFilterName(e.target.value)}
            />
            <select
              className="form-select"
              value={filterTower}
              onChange={e => setFilterTower(e.target.value)}
            >
              <option value="">Filtrar por Pabellón</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
            <input
              type="number"
              className="form-control"
              placeholder="Filtrar por Piso"
              value={filterFloor}
              onChange={e => setFilterFloor(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-grow-1 col-12 col-md-9">
          <table className="table table-bordered table-sm text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Pabellón</th>
                <th>Piso</th>
                <th>Salón</th>
                <th>Ambiente</th>
                <th>Fecha</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan={8}>Sin datos</td>
                </tr>
              ) : (
                filteredDepartments.map(dep => (
                  <tr key={dep.id}>
                    <td>{dep.id}</td>
                    <td>{dep.registeredUser}</td>
                    <td>{dep.tower}</td>
                    <td>{dep.floor}</td>
                    <td>{dep.classroom}</td>
                    <td className='fw-bold'>{dep.code}</td>
                    <td>{dep.registeredDate ? dep.registeredDate.substring(0, 10) : ''}</td>
                    <td>{dep.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DeparmentTable;
