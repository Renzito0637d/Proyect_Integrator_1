import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentForm.css'

function IncidentForm() {
    return (
        <>
            <legend className="fw-bold">Registrar incidencias informaticas</legend>
            <div className="row">
                <div className="col-md-4">
                    <p className="fw-medium">Descirpcion de la incidencia</p>
                    <textarea class="form-control" id="" rows="7"></textarea>
                </div>
                <div className="col-md-4">
                    <div className='mb-2'>
                        <p className="fw-medium">Departamento</p>
                        <select
                            id=""
                            className="form-select"
                        >
                            <option value=""></option>                            
                        </select>
                    </div>
                    <div className='mb-3'>
                        <p className="fw-medium">Area</p>
                        <select
                            id=""
                            className="form-select"
                        >
                            <option value=""></option>
                        </select>
                    </div>
                    <div className='justify-content-end d-flex'>
                        <button type="button" class="btn btn-danger">Registrar</button>
                        <button type="button" class="btn btn-primary ms-4">Consultar</button>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className='mb-2'>
                        <p className="fw-medium">Fecha de la incidencia</p>
                        <input
                            type="date"
                            id=""
                            className="form-control"
                        />
                    </div>
                    <div className='mb-3'>
                        <p className="fw-medium">Area</p>
                        <select
                            id=""
                            className="form-select"
                        >
                            <option value=""></option>
                        </select>
                    </div>
                    <div className=''>
                        <button type="button" class="btn btn-secondary">Acualizar</button>
                        <button type="button" class="btn btn-warning ms-4">Eliminar</button>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}
export default IncidentForm;