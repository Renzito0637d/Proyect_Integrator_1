import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardForm.css';

function DashboardForm() {
  return (
    <>
      <fieldset className="p-3 bg-light rounded border">
        <legend className="fw-bold">Resumen del sistema</legend>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="card border-info mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Incidencias</h5>
                <p className="card-text display-6">42</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Incidencias Resueltas</h5>
                <p className="card-text display-6">35</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">En proceso</h5>
                <p className="card-text display-6">5</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">Pendientes</h5>
                <p className="card-text display-6">2</p>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <hr className="border border-danger border-2 opacity-75" />
    </>
  );
}

export default DashboardForm;
