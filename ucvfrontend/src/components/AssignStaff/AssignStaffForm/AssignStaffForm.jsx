import React from 'react';

function AssignStaffForm() {
  return (
    <div className="bg-light p-3 rounded border mb-3">
      <h2 className="fw-bold">Asignar personal</h2>
      <span className="badge bg-success mb-3">#CAT-0001</span>

      <div className="d-flex justify-content-between flex-wrap gap-3 mb-3">
        <div className="flex-fill">
          <label className="fw-medium">Incidencias</label>
          <select className="form-select">
            <option>Se filtró la base de datos de la UTP</option>
          </select>
        </div>
        <div className="flex-fill">
          <label className="fw-medium">Empleado asignado</label>
          <select className="form-select">
            <option>ana.fuentes.1</option>
          </select>
        </div>
        <div className="flex-fill">
          <label className="fw-medium">Día de solución</label>
          <input type="date" className="form-control" />
        </div>
        <div className="flex-fill">
          <label className="fw-medium">Estado</label>
          <select className="form-select">
            <option>EN PROCESO</option>
          </select>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button className="btn btn-danger">Registrar</button>
        <button className="btn btn-primary">Consultar</button>
        <button className="btn btn-secondary">Actualizar</button>
        <button className="btn btn-warning">Eliminar</button>
        <button className="btn btn-success">Ver primero</button>
        <button className="btn btn-warning">Ver último</button>
      </div>
    </div>
  );
}

export default AssignStaffForm;

