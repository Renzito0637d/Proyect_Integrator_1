import React from 'react';
import './AssignStaffForm.css';

function AssignStaffForm() {
  return (
    <fieldset className="p-3 bg-light rounded border">
      <legend className="fw-bold">Asignar Personal</legend>
      <div className="row col-md-12 mb-2">
        <div className="col-md-4 mb-3">
          <label className="fw-medium">ID Incidencia</label>
          <input type="text" className="form-control" placeholder="Ingrese el ID de la incidencia" />
        </div>
        <div className="col-md-4 mb-3">
          <label className="fw-medium">Usuario a asignar</label>
          <select className="form-select">
            <option>[Seleccionar]</option>
            <option>admin1</option>
            <option>soporte2</option>
          </select>
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-end">
          <button className="btn btn-danger w-100">Asignar</button>
        </div>
      </div>
    </fieldset>
  );
}

export default AssignStaffForm;
