function ReportFrom(){
 return(
      <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold">
                    Informe de Incidencias Informáticas <span className="badge bg-success">#CAT-0001</span>
                </legend>
                <div className="row mb-3 ">
                    <div className="col-md-2 cent">
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
                    <div className="col-md-2">
                        <label className="fw-medium">Estado</label>
                        <select className="form-select">
                            <option>[Seleccionar]</option>
                            <option>En proceso</option>
                            <option>Derivado</option>
                            <option>Terminado</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="fw-bold">Descripción</label>
                        <textarea className="form-control" rows="5"></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-start gap-3 flex-wrap mb-3">
                    <button className="btn btn-danger">Registrar</button>
                    <button className="btn btn-primary">Consultar</button>
                    <button className="btn btn-secondary">Actualizar</button>
                    <button className="btn btn-warning">Eliminar</button>
                </div>

                {/* Línea roja después de los botones */}
                <hr className="border border-danger border-2 opacity-75" />
            </fieldset>
        </>
    );
}

export default ReportFrom;