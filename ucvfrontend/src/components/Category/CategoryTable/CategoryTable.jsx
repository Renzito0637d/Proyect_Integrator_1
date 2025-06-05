function CategoryTable() {
    return (
        <>
            <div className="d-flex bg-light p-3 rounded border col-12">
                <div className="flex-grow-1 me-4 col-md-10">
                    <table className="table tmn table-bordered text-center">
                        <thead className="table-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Nivel de prioridad</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Falla de software</td>
                                <td>Alto</td>
                                <td>Software</td>
                                <td>Problema con la instalación del sistema operativo</td>
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

export default CategoryTable;