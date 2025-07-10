import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentTable.css';

function IncidentTable({incidentList=[]}) {
    return (
        <>
            <div className="tabla">
                <table className="table tmn">
                    <thead className='table-info'>
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
                        {incidentList.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">No hay incidencias registradas.</td>
                            </tr>
                        ) : (
                            incidentList.map((incident, index) => (
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
        </>
    );
}

export default IncidentTable;