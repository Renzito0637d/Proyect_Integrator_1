import React from 'react';

function AssignStaffTable() {
  return (
    <>
      <div className="d-flex flex-wrap col-12 gap-2">
        {/* Tabla de asignaciones */}
        <div className="flex-grow-1 bg-light p-3 rounded border col-12 col-md-8">
          <div className="scroll">
            <table className="table table-bordered text-center">
              <thead className="table-info">
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
                {/* Datos estáticos o dinámicos aquí */}
                <tr>
                  <td>001</td>
                  <td>Bloqueo de acceso</td>
                  <td>En Proceso</td>
                  <td>ana.fuentes.1</td>
                  <td>Base de datos expuesta</td>
                  <td>2025-06-06</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel de descripción y orden */}
        <div className="col-12 col-md-4 mt-md-0" style={{ width: '300px' }}>
          <label className="fw-bold">Descripción</label>
          <textarea className="form-control mb-2" rows="8" placeholder="Detalle de la incidencia..."></textarea>

          <div className="d-flex align-items-center gap-2">
            <select className="form-select">
              <option>ID</option>
            </select>
            <button className="btn btn-primary">Ordenar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignStaffTable;
