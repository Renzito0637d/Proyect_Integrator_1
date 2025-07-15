import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './DeparmentFrom.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../../Utils/Auth';
import { toast } from 'sonner';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import IconButton from '../../IconButton';

function DeparmentFrom({ onDeparmentChanged }) {
  // Obtener nickname del usuario autenticado (ajusta según tu lógica de login)
  const [registeredUser, setRegisteredUser] = useState("");
  useEffect(() => {
    // Decodifica el JWT para obtener el nickname
    const token = sessionStorage.getItem("token");
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


  // Actualización
  const [updateId, setUpdateId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateModalId, setUpdateModalId] = useState("");

  // Eliminación
  const [deleteId, setDeleteId] = useState("");
  const [deleteResult, setDeleteResult] = useState(null);

  const clearFormFields = () => {
    setName(""); setTower(""); setFloor(""); setClassroom(""); setCode("");
  };
  // Validar formulario
  const validateForm = () => {
    if (!name.trim() || !tower.trim() || !floor.toString().trim() || !classroom.trim()) {
      toast.warning("Todos los campos son obligatorios.", { duration: 3000 });
      return false;
    }
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
      await axios.post(
        "http://localhost:8080/api/ucv/deparmentSave",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          }
        }
      );
      clearFormFields();
      toast.success("Departamento registrado correctamente.", { duration: 3000 });
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      toast.error("Error al registrar el departamento.", { duration: 3000 });
    }
  };

  // Consultar departamento por ID
  const handleConsult = async () => {
    setConsultResult(null);
    if (!consultId) {
      toast.error("Debe ingresar un ID.", { duration: 3000 });
      return;
    }
    try {
      const res = await axios.get(
        "http://localhost:8080/api/ucv/deparmentList",
        { headers: getAuthHeader() }
      );
      const dep = res.data.find(d => String(d.id) === String(consultId));
      if (dep) {
        toast.success("Departamento encontrado.", { duration: 3000 });
      }
      else {
        toast.error("Departamento no encontrado.", { duration: 3000 });
      }
    } catch {
      toast.error("Error al consultar el departamento.", { duration: 3000 });
    }
  };

  // Buscar para actualizar
  const handleFetchForUpdate = async () => {
    if (!updateModalId) {
      toast.error("Ingrese el ID del departamento a actualizar.", { duration: 3000 });
      return;
    }
    try {
      const res = await axios.get(
        "http://localhost:8080/api/ucv/deparmentList",
        { headers: getAuthHeader() }
      );
      const dep = res.data.find(d => String(d.id) === String(updateModalId));
      if (dep) {
        setUpdateId(dep.id);
        setName(dep.name || "");
        setTower(dep.tower || "");
        setFloor(dep.floor || "");
        setClassroom(dep.classroom || "");
        setCode(dep.code || "");
        setIsUpdating(true);
        toast.success("Departamento cargado para actualizar.", { duration: 3000 });
      } else {
        toast.error("Departamento no encontrado.", { duration: 3000 });
      }
    } catch {
      toast.error("Error al buscar el departamento.", { duration: 3000 });
    }
  };

  // Actualizar departamento
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateId) {
      toast.error("ID no definido.", { duration: 3000 });
      return;
    }
    if (!validateForm()) return;
    // Al actualizar, también se registra la fecha y hora actual como nueva fecha de registro
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const data = { registeredUser, name, tower, floor, classroom, registeredDate: dateTime, code };
    try {
      await axios.put(
        `http://localhost:8080/api/ucv/deparmentUpdate/${updateId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          }
        }
      );
      toast.success("Departamento actualizado correctamente.", { duration: 3000 });
      clearFormFields();
      setIsUpdating(false);
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      toast.error("Error al actualizar el departamento.", { duration: 3000 });
    }
  };

  // Consultar para eliminar
  const handleDeleteConsult = async () => {
    setDeleteResult(null);
    if (!deleteId) {
      toast.error("Debe ingresar un ID.", { duration: 3000 });
      return;
    }
    try {
      const res = await axios.get(
        "http://localhost:8080/api/ucv/deparmentList",
        { headers: getAuthHeader() }
      );
      const dep = res.data.find(d => String(d.id) === String(deleteId));
      if (dep) {
        setDeleteResult(dep);
        toast.success("Departamento encontrado.", { duration: 3000 });
      }
      else {
        toast.error("Departamento no encontrado.", { duration: 3000 });
      }
    } catch {
      toast.error("Error al consultar el departamento.", { duration: 3000 });
    }
  };

  // Eliminar departamento
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteId) {
      toast.error("ID no definido.", { duration: 3000 });
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8080/api/ucv/deparmentDelate/${deleteId}`,
        { headers: getAuthHeader() }
      );
      setDeleteId(""); setDeleteResult(null);
      toast.success("Departamento eliminado correctamente.", { duration: 3000 });
      if (onDeparmentChanged) onDeparmentChanged();
    } catch {
      toast.error("Error al eliminar el departamento.", { duration: 3000 });
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
      axios.post(
        'http://localhost:8080/api/ucv/deparmentExcel',
        {},
        {
          responseType: 'blob',
          headers: getAuthHeader(),
        }
      )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'deparment.xlsx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          toast.success("Archivo Excel descargado correctamente.", { duration: 3000 });
        })
        .catch(() => {
          toast.error("Error al descargar el archivo.", { duration: 3000 });
        })
    } catch (error) {
      toast.error('Error al descargar el archivo.', { duration: 3000 });
    }
  }

  const handlePdfExport = async () => {
    try {
      axios.post(
        'http://localhost:8080/api/ucv/deparmentPDF',
        {},
        {
          responseType: 'blob',
          headers: getAuthHeader(),
        }
      )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'deparment.pdf');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          toast.success("Archivo PDF descargado correctamente.", { duration: 3000 });
        })
        .catch(() => {
          toast.error("Error al descargar el archivo.", { duration: 3000 });
        })
    } catch (error) {
      toast.error('Error al descargar el archivo.', { duration: 3000 });
    }
  };

  return (
    <>
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
              <IconButton type="submit" className="btn btn-danger" disabled={isUpdating} icon={MdAddCircle}>Registrar</IconButton>
              <IconButton
                className="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalConsultDeparment"
                onClick={() => {
                  setConsultId("");
                  setConsultResult(null);
                }}
                disabled={isUpdating}
                icon={FaSearch}
              >
                Consultar
              </IconButton>
              <IconButton
                className="btn btn-secondary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalUpdateDeparment"
                disabled={isUpdating}
                icon={FaRegEdit}
              >
                Actualizar
              </IconButton>
              <IconButton
                className="btn btn-warning"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalDeleteDeparment"
                disabled={isUpdating}
                icon={FaTrash}
              >
                Eliminar
              </IconButton>
              {isUpdating && (
                <>
                  <IconButton className="btn btn-success" type="submit" icon={FaSave}>
                    Guardar actualización
                  </IconButton>
                  <IconButton
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setIsUpdating(false);
                      clearFormFields();
                    }}
                  >
                    Cancelar
                  </IconButton>
                </>
              )}
            </div>
            <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
              <IconButton className="btn btn-success" type='button' onClick={handleExcelExport} disabled={isUpdating} icon={FaFileExcel}>Excel</IconButton>
              <IconButton className="btn btn-warning" type='button'onClick={handlePdfExport} disabled={isUpdating} icon={FaFilePdf}>Pdf</IconButton>
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
