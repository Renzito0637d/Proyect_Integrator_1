import React, { useEffect, useState } from 'react';
import IconButton from '../../IconButton'
import { getAllIncidents, gettAllAdmins, registerAssign, getAssignId, updateAssign, deleteAssign, excelDownload, pdfDownload } from '../ProcessAssignStaff';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import { toast } from 'sonner';

function AssignStaffForm({ des, setDes, onAssignChange }) {

  const [incidents, setIncidents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [solutionDate, setSolutionDate] = useState("");
  const [status, setStatus] = useState("");

  const [selectedIncidentId, setSelectedIncidentId] = useState("");
  const [selectedIncidentDescription, setSelectedIncidentDescription] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  // Consultar
  const [consultAssignId, setConsultAssignId] = useState("");
  const [consultResult, setConsultResult] = useState(null);

  // Actualizar
  const [updateId, setUpdateId] = useState("");
  const [updateModalId, setUpdateModalId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Eliminar
  const [deleteId, setDeleteId] = useState("");
  const [deleteResult, setDeleteResult] = useState(null);

  const clear = () => {
    setSelectedIncidentId("");
    setSelectedIncidentDescription("");
    setSelectedStaff("");
    setSolutionDate("");
    setStatus("");
    setDes("");
  }

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getAllIncidents();
        console.log("Incidents:", data);
        setIncidents(data);

      } catch (error) {

      }
    };
    const fetchAdmins = async () => {
      try {
        const data = await gettAllAdmins();
        setAdmins(data);
      } catch (error) {

      }
    }

    fetchAdmins();
    fetchIncidents();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const selectedIncident = incidents.find(inc => String(inc.id) === String(selectedIncidentId));
      const selectedStaffAssing = admins.find(adm => adm.nickname === selectedStaff);

      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No se encontró el token de sesión.");
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const nickname = payload.nickname;

      if (!selectedIncidentId || !selectedStaff || !solutionDate || !status || !des) {
        toast.warning("Por favor complete todos los campos.");
        return
      }

      const AssignData = {
        incident: { id: selectedIncident.id },
        registeredDate: new Date().toISOString(),
        assignedUser: nickname,
        user: { id: selectedStaffAssing.id },
        dateSolution: solutionDate,
        status: status,
        description: des
      };

      clear();
      await registerAssign(AssignData);
      toast.success("Guardado correctamente");
      if (onAssignChange) onAssignChange();
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueIncidentId = Array.from(
    new Map(incidents.map((cat) => [cat.id, cat])).values()
  )

  const handleConsultAssign = async () => {
    const result = await getAssignId(consultAssignId);
    setConsultResult(result || null);
  };

  const handleFetchAssignForUpdate = async () => {
    const result = await getAssignId(updateModalId);
    if (result) {
      setUpdateId(result.id);
      setSelectedIncidentId(result.incident?.id || "");
      setSelectedIncidentDescription(result.incident?.description || "");
      setSelectedStaff(result.user?.nickname || "");
      setSolutionDate(result.dateSolution || "");
      setStatus(result.status || "");
      setDes(result.description || "");
      setIsUpdating(true);
    }
  };

  const handleUpdateAssign = async (e) => {
    e.preventDefault();
    try {
      const selectedIncident = incidents.find(inc => String(inc.id) === String(selectedIncidentId));
      const selectedStaffAssing = admins.find(adm => adm.nickname === selectedStaff);

      if (!selectedIncident || !selectedStaffAssing || !status || !solutionDate) {
        toast.warning("Complete todos los campos antes de actualizar.");
        return;
      }

      const token = sessionStorage.getItem("token");
      const payload = JSON.parse(atob(token.split('.')[1]));
      const nickname = payload.nickname;

      const updatedData = {
        incident: { id: selectedIncident.id },
        registeredDate: new Date().toISOString(),
        assignedUser: nickname,
        user: { id: selectedStaffAssing.id },
        dateSolution: solutionDate,
        status: status,
        description: des
      };

      console.log("Actualizando con datos:", updatedData);

      await updateAssign(updateId, updatedData);
      if (onAssignChange) onAssignChange();
      toast.success("Asignación actualizada correctamente.");

      // Limpiar
      setIsUpdating(false);
      clear();
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("Ocurrió un error al actualizar.");
    }
  };


  const handleConsultDelete = async () => {
    const result = await getAssignId(deleteId);
    setDeleteResult(result || null);
  };

  const handleDeleteAssign = async () => {
    try {
      await deleteAssign(deleteId);
      toast.success("Asignación eliminada.");
      setDeleteId("");
      setDeleteResult(null);
      if (onAssignChange) onAssignChange();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleExcelDownload = async () => {
    try {
      const response = await excelDownload();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'assignStaff.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Archivo Excel descargado exitosamente.");
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      toast.error("Error al descargar el archivo Excel.");
    }
  };

  const handlePdfDownload = async () => {
    try {
      const response = await pdfDownload();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'assignStaff.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Archivo PDF descargado exitosamente.");
    } catch (error) {
      console.error("Error al descargar el archivo PDF:", error);
      toast.error("Error al descargar el archivo PDF.");
    }
  }
  return (
    <>
      <div className="bg-light p-3 rounded border mb-3">
        <legend className="fw-bold">Asignar personal</legend>
        <span className="badge bg-success mb-3">#CAT-0001</span>
        <form onSubmit={isUpdating ? handleUpdateAssign : handleSave}>
          <div className="d-flex justify-content-between flex-wrap gap-3 mb-3">
            <div className="flex-fill ">
              <label className="fw-meium">Incidencias</label>
              <div className='col-12 d-flex gap-2'>
                <div className='col-3'>
                  <select className="form-select" value={selectedIncidentId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedIncidentId(id);

                      const selected = incidents.find((inc) => String(inc.id) === id);
                      setSelectedIncidentDescription(selected?.description || "");
                    }}>
                    <option value="">ID</option>
                    {uniqueIncidentId.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-9'>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedIncidentDescription}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Empleado asignado</label>
              <select className="form-select" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                <option value="">Selecionar personal</option>
                {admins.map((user) => (
                  <option key={user.id} value={user.nickname}>
                    {user.nickname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Día de solución</label>
              <input type="date" className="form-control" value={solutionDate} onChange={(e) => setSolutionDate(e.target.value)} />
            </div>
            <div className="flex-fill">
              <label className="fw-medium">Estado</label>
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">Seleccionar estado</option>
                <option value="EN PROCESO">EN PROCESO</option>
                <option value="DERIVADO">DERIVADO</option>
                <option value="ATENDIDO">ATENDIDO</option>
              </select>
            </div>
          </div>

          <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
            <div className='col-md-10 d-flex gap-2 flex-wrap'>
              <IconButton icon={MdAddCircle} className="btn btn-danger" type='submit' disabled={isUpdating}>Registrar</IconButton>
              <IconButton icon={FaSearch} className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalConsultAssign" disabled={isUpdating}>Consultar</IconButton>
              <IconButton icon={FaRegEdit} className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#modalUpdateAssign" disabled={isUpdating}>Actualizar</IconButton>
              <IconButton icon={FaTrash} className="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalDeleteAssign" disabled={isUpdating}>Eliminar</IconButton>
              {isUpdating && (
                <>
                  <IconButton
                    className="btn btn-success ml-2"
                    type="submit"
                    icon={FaSave}
                  >
                    Guardar actualización
                  </IconButton>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setIsUpdating(false);

                    }}
                  >
                    Cancelar
                  </button>
                </>
              )}
              <IconButton className="btn btn-success" disabled={isUpdating}>Ver primero</IconButton>
              <IconButton className="btn btn-warning" disabled={isUpdating}>Ver último</IconButton>
            </div>
            <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
              <IconButton icon={FaFileExcel} className="btn btn-success" type='button' disabled={isUpdating} onClick={handleExcelDownload}>Excel</IconButton>
              <IconButton icon={FaFilePdf} className="btn btn-warning" type='button' onClick={handlePdfDownload} disabled={isUpdating}>PDF</IconButton>
            </div>
          </div>
        </form>
      </div>

      <div className="modal fade" id="modalConsultAssign" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Consultar asignación</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input className="form-control mb-2" value={consultAssignId} onChange={e => setConsultAssignId(e.target.value)} placeholder="ID de asignación" />
              <button className="btn btn-primary mb-2" onClick={handleConsultAssign}>Consultar</button>
              {consultResult && (
                <div className="alert alert-success">
                  <strong>Incidencia:</strong> #{consultResult.incident?.id} <br />
                  <strong>Responsable:</strong> {consultResult.user?.nickname} <br />
                  <strong>Estado:</strong> {consultResult.status} <br />
                  <strong>Solución:</strong> {consultResult.dateSolution}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalUpdateAssign" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Actualizar asignación</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label>Ingrese el ID de la asignación:</label>
              <input className="form-control" value={updateModalId} onChange={e => setUpdateModalId(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFetchAssignForUpdate}>Buscar</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modalDeleteAssign" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar asignación</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input className="form-control mb-2" value={deleteId} onChange={e => setDeleteId(e.target.value)} placeholder="ID de asignación" />
              <button className="btn btn-primary mb-2" onClick={handleConsultDelete}>Consultar</button>
              {deleteResult && (
                <>
                  <div className="alert alert-success">
                    <strong>ID:</strong> {deleteResult.id} <br />
                    <strong>Incidencia:</strong> {deleteResult.incident?.id}
                  </div>
                  <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteAssign}>Eliminar</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default AssignStaffForm;
