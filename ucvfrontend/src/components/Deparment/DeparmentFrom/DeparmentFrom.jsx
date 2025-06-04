import 'bootstrap/dist/css/bootstrap.min.css';
import './DeparmentFrom.css'

function DeparmentFrom() {
  return (
    <>
      <fieldset className="p-3 bg-light rounded border">
        <legend className="fw-bold">
          Registro de Departamentos{" "}
          <span className="badge bg-success">#CAT-0000</span>
        </legend>

        {/* Campos del formulario alineados */}
        <div className="row mb-3">
          <div className="col-md-2">
            <label className="form-label fw-medium">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre del departamento"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label fw-medium">Pabellon</label>
            <select className="form-select">
              <option>[Seleccionar]</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label fw-medium">Piso</label>
            <input type="number" className="form-control" defaultValue={0} />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-medium">Salon</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el salón del departamento"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-medium">Fecha</label>
            <input type="date" className="form-control" />
          </div>
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-start gap-3 flex-wrap mb-2">
          <button className="btn btn-danger">Registrar</button>
          <button className="btn btn-primary">Consultar</button>
          <button className="btn btn-secondary">Actualizar</button>
          <button className="btn btn-warning">Eliminar</button>
        </div>

        {/* Línea roja justo debajo de los botones */}
        
      </fieldset>
      <hr className="border border-danger border-2 opacity-100 mt-3" />
    </>
  );
}

export default DeparmentFrom;
