import React, { use, useEffect, useState } from 'react';
import IconButton from '../../IconButton'
import { getAllIncidents } from '../ProcessAssignStaff';

function AssignStaffForm() {

  const [incidents,setIncidents]=useState([]);

  useEffect(()=>{
    const fetchIncidents= async()=>{
      try {
        const data= await getAllIncidents();
        setIncidents(data);
      } catch (error) {
        
      }
    };
    fetchIncidents();
  },[]);

  const uniqueIncidentId=Array.from(
    new Map(incidents.map((cat)=>[cat.id,cat])).values()
  )


  return (
    <div className="bg-light p-3 rounded border mb-3">
      <legend className="fw-bold">Asignar personal</legend>
      <span className="badge bg-success mb-3">#CAT-0001</span>

      <div className="d-flex justify-content-between flex-wrap gap-3 mb-3">
        <div className="flex-fill ">
          <label className="fw-meium">Incidencias</label>
          <div className='col-12 d-flex gap-2'>
            <div className='col-3'>
              <select className="form-select">
                <option>ID</option>
                {uniqueIncidentId.map((cat)=>(
                  <option key={cat.id} value={cat.id}>
                    {cat.id}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-9'>
              <input type="text" className="form-control" />
            </div>
          </div>
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

      <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
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
