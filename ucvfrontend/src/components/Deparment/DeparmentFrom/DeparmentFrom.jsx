import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './DeparmentFrom.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function DeparmentFrom({ onDeparmentChanged }) {
  // Obtener nickname del usuario autenticado (ajusta según tu lógica de login)
  const [registeredUser, setRegisteredUser] = useState("");
  useEffect(() => {
    // Decodifica el JWT para obtener el nickname
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.nickname) setRegisteredUser(payload.nickname);
        else setRegisteredUser("");
      } catch {
        setRegisteredUser("");
      }
    }
  }, []);

  const [name, setName] = useState("");
  const [tower, setTower] = useState("");
  const [floor, setFloor] = useState("");
  const [classroom, setClassroom] = useState("");
  const [code, setCode] = useState("");

  // Actualiza el code automáticamente cuando cambian tower, floor o classroom
  useEffect(() => {
    if (tower && floor && classroom) {
      // Asegura que floor y classroom sean de longitud 2 (ej: 2 -> "02")
      const floorStr = floor.toString().padStart(2, '0');
      const classroomStr = classroom.toString().padStart(2, '0');
      setCode(`${tower}${floorStr}${classroomStr}`);
    } else {
      setCode("");
    }
  }, [tower, floor, classroom]);

  // Consulta
  const [consultId, setConsultId] = useState("");
  const [consultResult, setConsultResult] = useState(null);
  const [consultError, setConsultError] = useState("");

  // Actualización
  const [updateId, setUpdateId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateModalId, setUpdateModalId] = useState("");

  // Eliminación
  const [deleteId, setDeleteId] = useState("");
  const [deleteResult, setDeleteResult] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  // Estado para mensajes de error de validación
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Mostrar toast de error
  useEffect(() => {
    if (formError) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  // Validar formulario
  const validateForm = () => {
    if (!name.trim() || !tower.trim() || !floor.toString().trim() || !classroom.trim()) {
      setFormError("Todos los campos son obligatorios.");
      return false;
    }
    setFormError("");
    return true;
  };

  // Registrar nuevo departamento
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Genera la fecha y hora actual en formato LocalDateTime (YYYY-MM-DDTHH:mm:ss)
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const data = { registeredUser, name, tower, floor, classroom, registeredDate: dateTime, code };
    try {
      await axios.post("http://localhost:8080/api/ucv/deparmentSave", data, {
        headers: { "Content-Type": "application/json" }
      });
      setName(""); setTower(""); setFloor(""); setClassroom(""); setCode("");
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      alert("Error al registrar el departamento.");
    }
  };

  // Consultar departamento por ID
  const handleConsult = async () => {
    setConsultResult(null);
    setConsultError("");
    if (!consultId) {
      setConsultError("Debe ingresar un ID.");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/api/ucv/deparmentList");
      const dep = res.data.find(d => String(d.id) === String(consultId));
      if (dep) setConsultResult(dep);
      else setConsultError("Departamento no encontrado.");
    } catch {
      setConsultError("Error al consultar el departamento.");
    }
  };

  // Buscar para actualizar
  const handleFetchForUpdate = async () => {
    if (!updateModalId) {
      alert("Ingrese el ID del departamento a actualizar.");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/api/ucv/deparmentList");
      const dep = res.data.find(d => String(d.id) === String(updateModalId));
      if (dep) {
        setUpdateId(dep.id);
        setName(dep.name || "");
        setTower(dep.tower || "");
        setFloor(dep.floor || "");
        setClassroom(dep.classroom || "");
        setCode(dep.code || "");
        setIsUpdating(true);
      } else {
        alert("Departamento no encontrado.");
      }
    } catch {
      alert("Error al buscar el departamento.");
    }
  };

  // Actualizar departamento
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateId) {
      alert("ID no definido.");
      return;
    }
    if (!validateForm()) return;
    // Al actualizar, también se registra la fecha y hora actual como nueva fecha de registro
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const data = { registeredUser, name, tower, floor, classroom, registeredDate: dateTime, code };
    try {
      await axios.put(`http://localhost:8080/api/ucv/deparmentUpdate/${updateId}`, data, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Departamento actualizado correctamente.");
      setUpdateId(""); setName(""); setTower(""); setFloor(""); setClassroom(""); setCode("");
      setIsUpdating(false);
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      alert("Error al actualizar el departamento.");
    }
  };

  // Consultar para eliminar
  const handleDeleteConsult = async () => {
    setDeleteResult(null);
    setDeleteError("");
    if (!deleteId) {
      setDeleteError("Debe ingresar un ID.");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/api/ucv/deparmentList");
      const dep = res.data.find(d => String(d.id) === String(deleteId));
      if (dep) setDeleteResult(dep);
      else setDeleteError("Departamento no encontrado.");
    } catch {
      setDeleteError("Error al consultar el departamento.");
    }
  };

  // Eliminar departamento
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteId) {
      alert("ID no definido.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/ucv/deparmentDelate/${deleteId}`);
      setDeleteId(""); setDeleteResult(null);
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      alert("Error al eliminar el departamento.");
    }
  };

  // Función utilitaria para permitir solo números enteros positivos
  const handleOnlyNumbersInput = setter => e => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setter(val);
  };

  const handleOnlyNumbersKeyDown = e => {
    if (
      ["e", "E", "+", "-", ".", ","].includes(e.key) ||
      (e.key.length === 1 && !/\d/.test(e.key))
    ) {
      e.preventDefault();
    }
  };

  const handleExcelExport = async () => {
    try {
      axios.post('http://localhost:8080/api/ucv/deparmentExcel', {}, {
        responseType: 'blob'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'deparment.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);

        })
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  }

  return (
    <>
      {/* Toast flotante para errores de validación */}
      {showToast && formError && (
        <div className='alert'>
          {formError}
        </div>
      )}
      <form onSubmit={isUpdating ? handleUpdate : handleSave}>
        <fieldset className="p-3 bg-light rounded border">
          <legend className="fw-bold">
            Registro de Departamentos{" "}
            <span className="badge bg-success">{code ? code : "#CAT-0000"}</span>
          </legend>
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label fw-medium">Usuario que registra</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nickname del usuario"
                value={registeredUser}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-medium">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre del departamento"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-medium">Pabellon</label>
              <select
                className="form-select"
                value={tower}
                onChange={e => setTower(e.target.value)}
              >
                <option value="">[Seleccionar]</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-medium">Piso</label>
              <input
                type="number"
                className="form-control"
                value={floor}
                onChange={handleOnlyNumbersInput(setFloor)}
                onKeyDown={handleOnlyNumbersKeyDown}
                placeholder="Piso"
                min={0}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-medium">Salon</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el salón del departamento"
                value={classroom}
                onChange={handleOnlyNumbersInput(setClassroom)}
                onKeyDown={handleOnlyNumbersKeyDown}
              />
            </div>

          </div>
          <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
            <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
              <button type="submit" className="btn btn-danger" disabled={isUpdating}>Registrar</button>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalConsultDeparment"
                onClick={() => {
                  setConsultId("");
                  setConsultResult(null);
                  setConsultError("");
                }}
                disabled={isUpdating}
              >
                Consultar
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalUpdateDeparment"
                disabled={isUpdating}
              >
                Actualizar
              </button>
              <button
                className="btn btn-warning"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalDeleteDeparment"
                disabled={isUpdating}
              >
                Eliminar
              </button>
              {isUpdating && (
                <>
                  <button className="btn btn-success" type="submit">
                    Guardar actualización
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setIsUpdating(false);
                      setUpdateId("");
                      setName("");
                      setTower("");
                      setFloor("");
                      setClassroom("");
                      setCode("");
                    }}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
            <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
              <button className="btn btn-success" type='button' onClick={handleExcelExport} disabled={isUpdating}>Excel</button>
              <button className="btn btn-warning" disabled={isUpdating}>Pdf</button>
            </div>

          </div>
        </fieldset>
      </form>
      <hr className="border border-danger border-2 opacity-100 mt-3" />

      {/* Modal de consulta */}
      <div className="modal fade" id="modalConsultDeparment" tabIndex="-1" aria-labelledby="modalConsultDeparmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalConsultDeparmentLabel">Consultar Departamento por ID</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">ID de departamento</label>
                <input
                  type="number"
                  className="form-control"
                  value={consultId}
                  onChange={e => setConsultId(e.target.value)}
                  placeholder="Ingrese el ID"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={handleConsult}
              >
                Consultar
              </button>
              {consultError && (
                <div className="alert alert-danger mt-2">{consultError}</div>
              )}
              {consultResult && (
                <div className=" alert-success mt-2">
                  <strong>Nombre:</strong> {consultResult.name} <br />
                  <strong>Pabellón:</strong> {consultResult.tower} <br />
                  <strong>Piso:</strong> {consultResult.floor} <br />
                  <strong>Salón:</strong> {consultResult.classroom} <br />
                  <strong>Fecha:</strong> {consultResult.registeredDate ? consultResult.registeredDate.substring(0, 10) : ""} <br />
                  <strong>Código:</strong> {consultResult.code}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para pedir ID de actualización */}
      <div className="modal fade" id="modalUpdateDeparment" tabIndex="-1" aria-labelledby="modalUpdateDeparmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalUpdateDeparmentLabel">Actualizar departamento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>Ingrese el ID del departamento a actualizar:</label>
              <input
                type="number"
                className="form-control"
                value={updateModalId}
                onChange={e => setUpdateModalId(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleFetchForUpdate} data-bs-dismiss="modal">Buscar</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para pedir ID de eliminar */}
      <div className="modal fade" id="modalDeleteDeparment" tabIndex="-1" aria-labelledby="modalDeleteDeparmentLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalDeleteDeparmentLabel">Eliminar departamento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">ID de departamento</label>
                <input
                  type="number"
                  className="form-control"
                  value={deleteId}
                  onChange={e => setDeleteId(e.target.value)}
                  placeholder="Ingrese el ID"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={handleDeleteConsult}
              >
                Consultar
              </button>
              {deleteError && (
                <div className="alert alert-danger mt-2">{deleteError}</div>
              )}
              {deleteResult && (
                <>
                  <div className="alert alert-success mt-2">
                    <strong>Nombre:</strong> {deleteResult.name} <br />
                    <strong>Pabellón:</strong> {deleteResult.tower} <br />
                    <strong>Piso:</strong> {deleteResult.floor} <br />
                    <strong>Salón:</strong> {deleteResult.classroom} <br />
                    <strong>Fecha:</strong> {deleteResult.registeredDate ? deleteResult.registeredDate.substring(0, 10) : ""} <br />
                    <strong>Código:</strong> {deleteResult.code}
                  </div>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Eliminar departamento</button>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeparmentFrom;
