import 'bootstrap/dist/css/bootstrap.min.css';
import './DeparmentTable.css'
function DeparmentTable() {
  return (
    <div className="d-flex bg-light p-3 rounded border">
      {/* Tabla principal */}
      <div className="flex-grow-1 me-4">
        <table className="table table-bordered table-sm text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Pabellón</th>
              <th>Piso</th>
              <th>Salón</th>
              <th>Fecha</th>
              <th>Área</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes mapear los datos */}
            <tr>
              <td>1</td>
              <td>A</td>
              <td>2</td>
              <td>305</td>
              <td>2025-06-04</td>
              <td>Informática</td>
            </tr>
            {/* Agrega más filas según sea necesario */}
          </tbody>
        </table>
      </div>

      {/* Filtro lateral derecho */}
      <div style={{ width: "200px" }}>
        <h6 className="fw-bold">Ordenar por</h6>
        <select className="form-select mb-2">
          <option>Nombre</option>
          <option>Fecha</option>
          <option>Piso</option>
        </select>
        <button className="btn btn-primary w-100">Ordenar</button>
      </div>
    </div>
  );
}

export default DeparmentTable;
