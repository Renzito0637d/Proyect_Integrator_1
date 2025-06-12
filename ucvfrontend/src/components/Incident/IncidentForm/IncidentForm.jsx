import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentForm.css'

function IncidentForm() {
    return (
        <>
            <fieldset className="p-2 bg-light rounded border">
                <legend className="fw-bold mb-4">Registrar incidencias informaticas</legend>
                <form>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="fw-medium mb-2" htmlFor="descripcion">Descripción de la incidencia</label>
                            <textarea className="form-control" id="descripcion" rows="7"></textarea>
                        </div>
                        <div className="col-md-8">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="fw-medium mb-1" htmlFor="departamento">Departamento</label>
                                    <select id="departamento" className="form-select mb-3">
                                        <option value="">Seleccione</option>
                                        {/* ...opciones... */}
                                    </select>
                                    <label className="fw-medium mb-1" htmlFor="area1">Área</label>
                                    <select id="area1" className="form-select">
                                        <option value="">Seleccione</option>
                                        {/* ...opciones... */}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-medium mb-1" htmlFor="fecha">Fecha de la incidencia</label>
                                    <input type="date" id="fecha" className="form-control mb-3" />
                                    <label className="fw-medium mb-1" htmlFor="area2">Área</label>
                                    <select id="area2" className="form-select">
                                        <option value="">Seleccione</option>
                                        {/* ...opciones... */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                            <button type="button" className="btn btn-danger">Registrar</button>
                            <button type="button" className="btn btn-primary">Consultar</button>
                            <button type="button" className="btn btn-secondary">Actualizar</button>
                            <button type="button" className="btn btn-warning">Eliminar</button>
                        </div>                        
                        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                            <button className="btn btn-success" type='button'>Excel</button>
                            <button className="btn btn-warning">Pdf</button>
                        </div>
                    </div>
                </form>
            </fieldset>
            <hr />
        </>
    );
}
export default IncidentForm;