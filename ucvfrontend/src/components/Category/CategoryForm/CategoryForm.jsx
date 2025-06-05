function CategoryForm() {
    return (
        <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold">Registro de tipos de incidencias</legend>
                <div className='row col-md-12'>
                    <div className="col-md-4">
                        <label className="fw-medium">Tipo de incidencia</label>
                        <input type="text" className="form-control" placeholder="Nombre del tipo de incidencia" />
                    </div>
                    <div className="col-md-3 d-grid gap-2 mb-2">
                        <div>
                            <label className="fw-medium">Nivel de prioridad</label>
                            <select
                                id=""
                                className="form-select"
                            >
                                <option value="">[Seleccionar]</option>
                                <option value="admin">Alto</option>
                                <option value="soporte">Medio</option>
                                <option value="redes">Bajo</option>
                            </select>
                        </div>
                        <div>
                            <label className="fw-medium">Categoria</label>
                            <select
                                id=""
                                className="form-select"
                            >
                                <option value="">[Seleccionar]</option>
                                <option value="admin">Software</option>
                                <option value="soporte">Hardware</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-5 d-grid gap-2 mb-2">
                        <label className="fw-medium">Descripción</label>
                        <textarea class="form-control" id="" rows="4"></textarea>
                    </div>
                </div>
                <div>
                    <div className='d-flex justify-content-start gap-4 flex-wrap'>
                        <button className="btn btn-danger">Registrar</button>
                        <button className="btn btn-primary">Consultar</button>
                        <button className="btn btn-secondary">Actualizar</button>
                        <button className="btn btn-warning">Eliminar</button>
                    </div>
                </div>
            </fieldset>
            <hr className="border border-danger border-2 opacity-75" />
        </>
    );
}

export default CategoryForm;