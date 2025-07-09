import React from 'react';

function AssignStaffTable({ des, setDes, assignStaffs = [] }) {
  return (
    <>
      <div className="d-flex flex-wrap col-12 gap-2">
        {/* Tabla de asignaciones */}
        <div className="flex-grow-1 bg-light p-3 rounded border col-12 col-md-8">
          <div className="">
            <table className="table table-bordered text-center">
              <thead className="table-info">
                <tr>
                  <th>ID</th>
                  <th>Hora registrada</th>
                  <th>Asignador</th>
                  <th>Incidencia</th>
                  <th>Estado</th>
                  <th>Personal</th>                  
                  <th>Fecha solución</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {assignStaffs.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">Sin datos</td>
                  </tr>
                ) : (
                  assignStaffs.map((assignStaff) => (
                    <tr key={assignStaff.id}>
                      <td>{assignStaff.id}</td>
                      <td>
                        {assignStaff.registeredDate
                          ? new Date(assignStaff.registeredDate).toLocaleString('es-PE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })
                          : "-"}
                      </td>

                      <td>{assignStaff.assignedUser}</td>
                      <td>{assignStaff.incident?.id || "-"}</td> {/* ID de la incidencia */}
                      <td>{assignStaff.status}</td>
                      <td>{assignStaff.user?.nickname || "-"}</td>                      
                      <td>{assignStaff.dateSolution ? assignStaff.dateSolution.substring(0, 10) : "-"}</td>
                      <td>{assignStaff.description}</td>
                    </tr>

                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel de descripción y orden */}
        <div className="col-12 col-md-4 mt-md-0" style={{ width: '300px' }}>
          <label className="fw-bold">Descripción</label>
          <textarea className="form-control mb-2" rows="8" placeholder="Detalle de la incidencia..."
            value={des} onChange={(e) => setDes(e.target.value)}
          ></textarea>
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
