import React from 'react';
import IconButton from '../../IconButton'

function AssignStaffForm() {
  return (
    <div className="bg-light p-3 rounded border mb-3">
      <legend className="fw-bold">Asignar personal</legend>
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

      <div className="col-md-12 d-flex flex-wrap gap-3">
        <div className='col-md-10 d-flex gap-2 flex-wrap'>
          <IconButton className="btn btn-danger">Registrar</IconButton>
          <IconButton className="btn btn-primary">Consultar</IconButton>
          <IconButton className="btn btn-secondary">Actualizar</IconButton>
          <IconButton className="btn btn-warning">Eliminar</IconButton>
          <IconButton className="btn btn-success">Ver primero</IconButton>
          <IconButton className="btn btn-warning">Ver último</IconButton>
        </div>
        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
          <IconButton className="btn btn-success" type='button'>Excel</IconButton>
          <IconButton className="btn btn-warning">PDF</IconButton>          
        </div>
      </div>
    </div>
  );
}

export default AssignStaffForm;
