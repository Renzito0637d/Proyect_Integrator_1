function StaffTable() {
    return (
        <>
            <div className="d-flex bg-light p-3 rounded border col-12">
                <div className="flex-grow-1 me-4 col-md-10">
                    <table className="table tmn table-bordered text-center">
                        <thead className="table-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Telefóno</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Contraseña</th>
                                <th scope="col">Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Juan</td>
                                <td>Pérez</td>
                                <td>juan@asd.es</td>
                                <td>987654321</td>
                                <td>juanperez</td>
                                <td>123456</td>
                                <td>Administrador de sistemas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "200px" }}>
                    <label className="fw-medium">Ordenar por</label>
                    <select className="form-select mb-2">
                        <option>Id</option>
                        <option>Nombre</option>
                        <option>Apellido</option>
                        <option>Usuario</option>
                        <option>Cargo</option>
                    </select>
                    <button className="btn btn-primary w-100">Ordenar</button>
                </div>
            </div>

        </>
    );
}

export default StaffTable;
