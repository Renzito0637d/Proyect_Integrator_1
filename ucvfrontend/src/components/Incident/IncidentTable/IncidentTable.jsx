import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentTable.css';

function IncidentTable() {
    return (
        <>
            <div class="tabla">
                <table class="table tmn">
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
                        <tr>
                            <td>1</td>
                            <td>Usuario 1</td>
                            <td>2023-10-01 12:00</td>
                            <td>Departamento A</td>
                            <td>Área 1</td>
                            <td>Descripción de la incidencia 1</td>
                            <td>2023-10-02</td>
                            <td>Tipo A</td>
                            <td>Alta</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Usuario 2</td>
                            <td>2023-10-01 13:00</td>
                            <td>Departamento B</td>
                            <td>Área 2</td>
                            <td>Descripción de la incidencia 2</td>
                            <td>2023-10-03</td>
                            <td>Tipo B</td>
                            <td>Baja</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default IncidentTable;