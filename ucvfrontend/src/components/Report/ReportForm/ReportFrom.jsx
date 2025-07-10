import IconButton from '../../IconButton'
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { getAllAssign, saveReport, getReportId, updateReport, delateReport, excelDownload, pdfDownload } from '../ProcessReport';
import { toast } from 'sonner';

function ReportFrom({ onReportChange }) {

    const [assign, setAssign] = useState([]);

    const [selectedAssignId, setSelectedAssignId] = useState("");
    const [selectedIncidentDescription, setSelectedIncidentDescription] = useState("");
    const [selectedActions, setSelectedActions] = useState("");

    const [resolutionDate, setResolutionDate] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    // Consultar
    const [consultReportId, setConsultReportId] = useState("");
    const [consultResult, setConsultResult] = useState(null);

    // Actualizar
    const [updateId, setUpdateId] = useState("");
    const [updateModalId, setUpdateModalId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Eliminar
    const [deleteId, setDeleteId] = useState("");
    const [deleteResult, setDeleteResult] = useState(null);

    useEffect(() => {
        const fetchAssign = async () => {
            try {
                const data = await getAllAssign();
                setAssign(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAssign();
    }, [])

    const uniqueAssignList = Array.from(new Map(assign.map(a => [a.id, a])).values());

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setSelectedAssignId(selectedId);

        const selected = assign.find((a) => String(a.id) === String(selectedId));
        const desc = selected?.description || "Sin descripción";
        setSelectedIncidentDescription(desc);
    };

    const clear = () => {
        setSelectedAssignId("");
        setSelectedActions("");
        setStatus("");
        setResolutionDate("");
        setDescription("")
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const selectAssign = assign.find(assign => String(assign.id) === String(selectedAssignId))
            const token = sessionStorage.getItem("token");
            if (!token) {
                alert("No se encontró el token de sesión.");
                return;
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const id = payload.userId;

            if (!selectedAssignId || !selectedActions || !status || !resolutionDate || !description) {
                toast.warning("Completar todos los campos.")
                return
            }

            const reportData = {
                assignStaff: { id: selectAssign.id },
                actions: selectedActions,
                status: status,
                resolutionDate: resolutionDate,
                user: { id: id },
                descripcion: description
            };
            clear();
            await saveReport(reportData);
            toast.success("Reporte guardado exitoxamente.")
            if (onReportChange) onReportChange();
        } catch (error) {

        }
    }

    const handleConsult = async (e) => {
        const result = await getReportId(consultReportId);
        setConsultResult(result || null);
    }

    const handleFetchForUpdate = async () => {
        const result = await getReportId(updateModalId);
        if (result) {
            setUpdateId(result.id);
            setSelectedAssignId(result.assignStaff?.id || "");
            setDescription(result.descripcion || "");
            setSelectedActions(result.actions || "");
            setStatus(result.status || "");
            setResolutionDate(result.resolutionDate || "");
            setIsUpdating(true);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const selectAssign = assign.find(assign => String(assign.id) === String(selectedAssignId))
            const token = sessionStorage.getItem("token");
            if (!token) {
                alert("No se encontró el token de sesión.");
                return;
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const id = payload.userId;

            if (!selectedAssignId || !selectedActions || !status || !resolutionDate || !description) {
                toast.warning("Completar todos los campos.")
                return
            }

            const updateData = {
                assignStaff: { id: selectAssign.id },
                actions: selectedActions,
                status: status,
                resolutionDate: resolutionDate,
                user: { id: id },
                descripcion: description
            };
            clear();
            await updateReport(updateId, updateData);
            toast.success("Report actualizado correctamente.")
            if (onReportChange) onReportChange();
            setIsUpdating(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConsultDelete = async () => {
        const result = await getAllAssign(deleteId);
        setDeleteResult(result || null);
    };

    const handleDelete = async () => {
        try {
            await delateReport(deleteId);
            setDeleteId("");
            setDeleteResult(null);
            toast.success("Reporte eliminado.")
            if (onReportChange) onReportChange();
        } catch (error) {
            console.error("Error al eliminar:", error);
            toast.warning("Error al eliminar")
        }
    };

    const handleExcelDownload = async () => {
        try {
            const response = await excelDownload();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reportes.xlsx'); // Cambia aquí el nombre
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
            link.setAttribute('download', 'reports.pdf'); // Cambia aquí el nombre
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Archivo PDF descargado exitosamente.");
        } catch (error) {
            console.error("Error al descargar el archivo PDF:", error);
            toast.error("Error al descargar el archivo PDF.");
        }
    };

    return (
        <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold">
                    Informe de Incidencias Informáticas <span className="badge bg-success">#CAT-0001</span>
                </legend>
                <form onSubmit={isUpdating ? handleUpdate : handleSave}>
                    <div className="row mb-3 ">
                        <div className="col-md-3 cent">
                            <label className="fw-medium">Asignación personal</label>
                            <div className='col-12 d-flex gap-2'>
                                <div className='col-3'>
                                    <select className="form-select" value={selectedAssignId} onChange={handleSelectChange}>
                                        <option value="">ID</option>
                                        {uniqueAssignList.map((assign) => (
                                            <option key={assign.id} value={assign.id}>
                                                {assign.id}
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
                        <div className="col-md-3">
                            <label className="fw-medium">Acciones tomadas</label>
                            <select className="form-select" value={selectedActions} onChange={(e) => setSelectedActions(e.target.value)}>
                                <option value="">[Seleccionar]</option>
                                <option>Reinicio de sistemas</option>
                                <option>Actualizacion de hardware</option>
                                <option>Actualizacion de software</option>
                                <option>Correccion de configuracion</option>
                                <option>Se aplicaron parches</option>
                                <option>Restablecimiento de red</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="fw-medium">Fecha de resolución</label>
                            <input type="date" className="form-control" value={resolutionDate} onChange={(e) => setResolutionDate(e.target.value)} />
                        </div>
                        <div className="col-md-3">
                            <label className="fw-medium">Estado</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">[Seleccionar]</option>
                                <option>En proceso</option>
                                <option>Derivado</option>
                                <option>Terminado</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="fw-bold">Descripción</label>
                            <textarea className="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                            <IconButton icon={MdAddCircle} className="btn btn-danger" type='submit' disabled={isUpdating}>Registrar</IconButton>
                            <IconButton icon={FaSearch} className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalConsult" disabled={isUpdating}>Consultar</IconButton>
                            <IconButton icon={FaRegEdit} className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#modalUpdate" disabled={isUpdating}>Actualizar</IconButton>
                            <IconButton icon={FaTrash} className="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalDelete" disabled={isUpdating}>Eliminar</IconButton>
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
                                            clear();
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                            <IconButton icon={FaFileExcel} className="btn btn-success" type='button' disabled={isUpdating} onClick={handleExcelDownload}>Excel</IconButton>
                            <IconButton icon={FaFilePdf} className="btn btn-warning" type='button' onClick={handlePdfDownload} disabled={isUpdating}>PDF</IconButton>
                        </div>
                    </div>
                </form>

                {/* Línea roja después de los botones */}
            </fieldset>
            <hr className="border border-danger border-2 opacity-100 mt-4" />
            <div className="modal fade" id="modalConsult" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Consultar asignación</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control mb-2" value={consultReportId} onChange={e => setConsultReportId(e.target.value)} placeholder="ID de asignación" />
                            <button className="btn btn-primary mb-2" onClick={handleConsult}>Consultar</button>
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
            <div className="modal fade" id="modalUpdate" tabIndex="-1">
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
                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleFetchForUpdate}>Buscar</button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalDelete" tabIndex="-1">
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
                                    <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportFrom;