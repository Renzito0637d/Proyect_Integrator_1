import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportTable.css';
function RerportTable() {
    return (
        <>
            <div className="tabla mt-4">
                <table className="table tmn table-bordered text-center">
                    <thead className="table-info">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Acciones Tomadas</th>
                            <th scope="col">Estados</th>
                            <th scope="col">Personal</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Se reinició el sistema</td>
                            <td>Terminado</td>
                            <td>María López</td>
                            <td>Problema de acceso</td>
                            <td>2025-06-04</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Se cambió contraseña</td>
                            <td>Derivado</td>
                            <td>Carlos Ruiz</td>
                            <td>Solicitud de usuario</td>
                            <td>2025-06-03</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default RerportTable;