import 'bootstrap/dist/css/bootstrap.min.css';
import './StaffForm.css';

function StaffForm() {
    return (
        <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold">Registro de personal</legend>
                <div className='row col-md-12 mb-2'>

                    <div className="col-md-3 d-grid gap-2 mb-2">
                        <div>
                            <label className="fw-medium">Nombre</label>
                            <input type="text" className="form-control" placeholder="Ingrese el nombre del personal" />
                        </div>
                        <div>
                            <label className="fw-medium">Apellido</label>
                            <input type="text" className="form-control" placeholder="Ingrese el apellido del personal" />
                        </div>
                    </div>
                    <div className="col-md-3 d-grid gap-2 mb-2">
                        <div>
                            <label className="fw-medium">Correo</label>
                            <input type="text" className="form-control" placeholder="Ingrese el correo del personal" />
                        </div>
                        <div>
                            <label className="fw-medium">Telefono móvil</label>
                            <input type="text" className="form-control" placeholder="Ingrese el telefóno del personal" />
                        </div>
                    </div>
                    <div className="col-md-3 d-grid gap-2 mb-2">
                        <div>
                            <label className="fw-medium">Contraseña</label>
                            <input type="text" className="form-control" placeholder="Ingrese la contraseña del personal" />
                        </div>
                        <div>
                            <label className="fw-medium">Cargo</label>
                            <select
                                id=""
                                className="form-select"
                            >
                                <option value="">[Seleccionar]</option>
                                <option value="admin">Administrador de sistemas</option>
                                <option value="soporte">Soporte técnico</option>
                                <option value="redes">Especialista de redes</option>
                                <option value="seguridad">Seguridad informática</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 d-grid gap-2 mb-2">
                        <div>
                            <label className="fw-medium">Contraseña</label>
                            <input type="text" className="form-control" placeholder="Ingrese la contraseña del personal" />
                        </div>
                        <div className='d-flex justify-content-end gap-3 mt-4'>
                            <button type="button" class="btn btn-secondary">Autogenerar</button>
                        </div>
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

export default StaffForm;