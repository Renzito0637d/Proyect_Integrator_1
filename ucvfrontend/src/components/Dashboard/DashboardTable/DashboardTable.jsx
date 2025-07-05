import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardTable.css';

function DashboardTable() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8080/api/ucv/dashboardList')
      .then(response => setDashboardData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="d-flex bg-light p-3 rounded border col-12 mt-4">
      <div className="flex-grow-1 me-4 col-md-12">
        <table className="table table-bordered text-center">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Incidente</th>
              <th>Estado</th>
              <th>Responsable</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.descripcion}</td>
                <td>{item.estado}</td>
                <td>{item.responsable}</td>
                <td>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;
