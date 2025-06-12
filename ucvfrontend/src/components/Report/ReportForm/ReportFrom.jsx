function ReportFrom() {
    return (
        <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold">
                    Informe de Incidencias Informáticas <span className="badge bg-success">#CAT-0001</span>
                </legend>
                <div className="row mb-3 ">
                    <div className="col-md-3 cent">
                        <label className="fw-medium">Incidencias</label>
                        <select className="form-select">
                            <option>Se filtró la base de datos</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="fw-medium">Acciones tomadas</label>
                        <select className="form-select">
                            <option>[Seleccionar]</option>
                            <option>Se restauró la base</option>
                            <option>Se aplicaron parches</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="fw-medium">Fecha de resolución</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label className="fw-medium">Estado</label>
                        <select className="form-select">
                            <option>[Seleccionar]</option>
                            <option>En proceso</option>
                            <option>Derivado</option>
                            <option>Terminado</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="fw-bold">Descripción</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>
                </div>

                <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                    <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                        <button className="btn btn-danger">Registrar</button>
                        <button className="btn btn-primary">Consultar</button>
                        <button className="btn btn-secondary">Actualizar</button>
                        <button className="btn btn-warning">Eliminar</button>
                    </div>
                    <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                        <button className="btn btn-success" type='button' >Excel</button>
                        <button className="btn btn-warning" >Pdf</button>
                    </div>
                </div>

                {/* Línea roja después de los botones */}
            </fieldset>
            <hr className="border border-danger border-2 opacity-100 mt-4" />
        </>
    );
}

export default ReportFrom;