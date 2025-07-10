import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportTable.css';

function ReportTable({ reports = [] }) {
  const [sortBy, setSortBy] = useState('ID');
  console.log(reports)
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
  };

  return (
    <>
      <div className="d-flex flex-wrap bg-light p-3 rounded border col-12 gap-2">
        {/* Tabla principal */}
        <div className="flex-grow-1 col-12 col-md-10">

          <table className="table table-bordered table-sm text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Acciones Tomadas</th>
                <th>Id asignacion</th>
                <th>Estados</th>
                <th>Personal</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">Sin datos</td>
                </tr>
              ) : (
                reports.map((report) => {
                  return (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.actions}</td>
                      <td>{report.assignStaff ? report.assignStaff.id : '-'}</td> {/* Verifica si assignStaff existe */}
                      <td>{report.status}</td>
                      <td>{report.user ? report.user.nickname : '-'}</td> {/* Verifica si user existe */}
                      <td>{report.descripcion}</td>
                      <td>
                        {report.resolutionDate
                          ? new Date(report.resolutionDate).toLocaleString('es-PE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              )}

            </tbody>
          </table>

        </div>

        {/* Panel lateral derecho */}
        <div className="col-12 col-md-2 mt-md-0" style={{ width: "100px" }}>
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
    </>
  );
}

export default ReportTable;
