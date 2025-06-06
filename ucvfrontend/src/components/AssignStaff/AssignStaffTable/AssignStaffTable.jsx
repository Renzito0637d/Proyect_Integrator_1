import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AssignStaffTable.css';

function AssignStaffTable() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8080/api/ucv/assignmentList')
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="d-flex bg-light p-3 rounded border col-12 mt-4">
      <div className="flex-grow-1 me-4 col-md-12">
        <table className="table table-bordered text-center">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Incidencia</th>
              <th>Usuario Asignado</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.incidente}</td>
                <td>{a.usuario}</td>
                <td>{a.fecha}</td>
                <td>{a.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignStaffTable;
