import axios from 'axios';
import '../styles/Home.css';
import { getAuthHeader } from '../Utils/Auth';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [assignStaffs, setAssignStaffs] = useState([]);

  const loadIncidents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/ucv/getAllIncidents', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      });
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const loadAssignStaff = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/ucv/assignStaffList`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      });
      setAssignStaffs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadIncidents();
    loadAssignStaff();
  }, []);

  const totalIncidencias = incidents.length;
  const resueltas = assignStaffs.filter(a => a.status === "ATENDIDO").length;
  const enProceso = assignStaffs.filter(a => a.status === "EN PROCESO").length;
  const pendientes = assignStaffs.filter(a => a.status === "DERIVADO").length;

  return (
    <>
      <fieldset className="p-3 bg-light rounded border">
        <legend className="fw-bold">Resumen del sistema</legend>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="card border-info mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Incidencias</h5>
                <p className="card-text display-6">{totalIncidencias}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Incidencias Resueltas</h5>
                <p className="card-text display-6">{resueltas}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">En proceso</h5>
                <p className="card-text display-6">{enProceso}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">Pendientes</h5>
                <p className="card-text display-6">{pendientes}</p>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <hr className="border border-danger border-2 opacity-75" />
      <div className="d-flex bg-light p-3 rounded border col-12">
        <div className="flex-grow-1 col-md-12">
          <table className="table table-bordered table-sm text-center tmn mb-0">
            <thead className='table-light'>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Usuario registrado</th>
                <th scope="col">Fecha-Hora registrada</th>
                <th scope="col">Departamento</th>
                <th scope="col">Área de incidencia</th>
                <th scope="col">Descripción</th>
                <th scope="col">Fecha de incidencia</th>
                <th scope="col">Tipo de incidencia</th>
                <th scope="col">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">No hay incidencias registradas.</td>
                </tr>
              ) : (
                incidents.map((incident, index) => (
                  <tr key={incident.id || index}>
                    <td>{incident.id}</td>
                    <td>{incident.registeredUser}</td>
                    <td>{incident.registeredDate?.substring(0, 16).replace("T", " ")}</td>
                    <td>{incident.deparment?.name}</td>
                    <td>{incident.area}</td>
                    <td>{incident.description}</td>
                    <td>{incident.incidenDate}</td>
                    <td>{incident.category?.type}</td>
                    <td>{incident.prioritylevel}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="border border-danger border-2 opacity-75" />
      <div className="d-flex bg-light p-3 rounded border col-12">
        <div className="flex-grow-1 col-md-12">
          <table className="table table-bordered table-sm text-center tmn mb-0">
            <thead className="table-light">
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
    </>
  );
};

export default Dashboard;
