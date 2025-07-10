import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentForm.css'
import { getAllDeparments, getAllCategories, registerIncident, deleteIncident, getIncidentById, updateIncident, excelDownload, pdfDownload } from '../ProcessIncident';
import IconButton from '../../IconButton';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'

function IncidentForm({ onIncidentChange }) {

    const [description, setDescription] = useState("");
    const [incidentDate, setIncidentDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const [category, setCategory] = useState([]);

    const [isUpdating, setIsUpdating] = useState(false);

    // Consultar
    const [consultId, setConsultId] = useState("");
    const [consultResult, setConsultResult] = useState(null);

    // Actualizar
    const [updateId, setUpdateId] = useState("");
    const [updateModalId, setUpdateModalId] = useState("");

    // Eliminar
    const [deleteId, setDeleteId] = useState("");
    const [deleteResult, setDeleteResult] = useState(null);

    const clearIncidentFormFields = () => {
        setDescription("");
        setIncidentDate("");
        setSelectedCategory("");
        setSelectedDepartmentName("");
        setSelectedCode("");
    };


    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getAllDeparments();
                setDepartments(data);
            } catch (error) {
                console.error("No se pudieron cargar los departamentos.");
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategory(data);
            } catch (error) {
                console.error("No se pudieron cargar las categorías.");
            }
        };

        fetchDepartments();
        fetchCategories();
    }, []);

    // Obtener nombres únicos de departamentos
    const uniqueDepartmentNames = Array.from(
        new Set(departments.map((dep) => dep.name))
    );

    // Filtrar departamentos que coincidan con el nombre seleccionado
    const filteredByName = departments.filter(
        (dep) => dep.name === selectedDepartmentName
    );

    const uniqueCategories = Array.from(
        new Map(category.map((cat) => [cat.type, cat])).values()
    );

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                alert("No se encontró el token de sesión.");
                return;
            }

            // Decodificar el token manualmente
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.userId;
            const nickname = payload.nickname || "Usuario";

            if (!userId) {
                alert("El token no contiene ID de usuario.");
                return;
            }

            // Obtener departamento y categoría seleccionados
            const selectedDepartment = departments.find(dep => dep.code === selectedCode);
            const selectedCategoryObj = category.find(cat => cat.type === selectedCategory);

            if (!selectedDepartment || !selectedCategoryObj || !description || !incidentDate) {
                toast.warning("Por favor complete todos los campos.")
                return;
            }

            const incidentData = {
                description: description,
                incidenDate: incidentDate,
                registeredDate: new Date().toISOString(),
                registeredUser: nickname,
                prioritylevel: selectedCategoryObj.prioritylevel,
                user: { id: userId },
                area: selectedCode,
                deparment: { id: selectedDepartment.id },
                category: { id: selectedCategoryObj.id },
            };

            await registerIncident(incidentData);
            toast.success("Incidencia registrada exitosamente.");

            clearIncidentFormFields();
            if (onIncidentChange) onIncidentChange();
        } catch (error) {
            console.error("Error al registrar incidencia:", error);
            toast.error("Error al registrar la incidencia.")
        }
    };

    const handleConsultIncident = async () => {
        try {
            const result = await getIncidentById(consultId);
            setConsultResult(result || null);
        } catch (error) {
            console.error("Error al consultar", error);
        }
    };

    const handleFetchIncidentForUpdate = async () => {
        try {
            const result = await getIncidentById(updateModalId);
            if (result) {
                setUpdateId(result.id);
                setDescription(result.description || "");
                setIncidentDate(result.incidenDate || "");
                setSelectedCategory(result.category?.type || "");
                setSelectedCode(result.area || "");
                setSelectedDepartmentName(result.deparment?.name || "");
                setIsUpdating(true);
            }
        } catch (error) {
            console.error("Error al cargar incidencia", error);
        }
    };

    const handleUpdateIncident = async (e) => {
        e.preventDefault();
        try {
            // Obtener departamento y categoría seleccionados
            const selectedDepartment = departments.find(dep => dep.code === selectedCode);
            const selectedCategoryObj = category.find(cat => cat.type === selectedCategory);

            if (!selectedDepartment || !selectedCategoryObj || !description || !incidentDate) {
                toast.warning("Por favor complete todos los campos.")
                return;
            }

            const updatedData = {
                description,
                incidenDate: incidentDate,
                registeredDate: new Date().toISOString(),
                registeredUser: sessionStorage.getItem("nickname") || "Usuario",
                prioritylevel: selectedCategoryObj.prioritylevel,
                area: selectedCode,
                category: { id: category.find(c => c.type === selectedCategory)?.id },
                deparment: { id: departments.find(d => d.code === selectedCode)?.id },
            };
            await updateIncident(updateId, updatedData);
            toast.success("Incidencia actualizada.")
            clearIncidentFormFields();
            setIsUpdating(false);
            if (onIncidentChange) onIncidentChange();
        } catch (error) {
            console.error("Error al actualizar", error);
        }
    };

    const handleDeleteConsult = async () => {
        try {
            const result = await getIncidentById(deleteId);
            setDeleteResult(result || null);
        } catch (error) {
            console.error("Error al buscar para eliminar", error);
        }
    };

    const handleDeleteIncident = async () => {
        try {
            await deleteIncident(deleteId);
            toast.success("Incidencia eliminada correctamente.")
            setDeleteId("");
            setDeleteResult(null);
            if (onIncidentChange) onIncidentChange();
        } catch (error) {
            console.error("Error al eliminar", error);
        }
    };

    const handleExcelDownload = async () => {
        try {
            const response = await excelDownload();        
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href =url;
            link.setAttribute('download', 'incidencias.xlsx');
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
            link.setAttribute('download', 'incidencias.pdf');
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
                <legend className="fw-bold mb-4">Registrar incidencias informaticas</legend>
                <form onSubmit={isUpdating ? handleUpdateIncident : handleSave}>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="fw-medium mb-2" htmlFor="descripcion">Descripción de la incidencia</label>
                            <textarea className="form-control" id="descripcion" rows="7" value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="col-md-8">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="fw-medium mb-1" htmlFor="departamento">Departamento</label>
                                    <select
                                        className='form-select mb-3'
                                        value={selectedDepartmentName}
                                        onChange={(e) => {
                                            setSelectedDepartmentName(e.target.value);
                                            setSelectedCode(""); // Reinicia código cuando se cambia el nombre
                                        }}
                                    >
                                        <option value="">Seleccione un departamento</option>
                                        {uniqueDepartmentNames.map((name, index) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="fw-medium mb-1" htmlFor="area1">Área de la incidencia</label>
                                    <select
                                        className='form-select'
                                        value={selectedCode}
                                        onChange={(e) => setSelectedCode(e.target.value)}
                                        disabled={!selectedDepartmentName}
                                    >
                                        <option value="">Seleccione un ambiente</option>
                                        {filteredByName.map((dep) => (
                                            <option key={dep.id} value={dep.code}>
                                                {dep.code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-medium mb-1" htmlFor="fecha">Fecha de la incidencia</label>
                                    <input type="date" id="fecha" className="form-control mb-3" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
                                    <label className="fw-medium mb-1" htmlFor="area2">Tipo de incidencia</label>
                                    <select
                                        id="area2"
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Seleccione</option>
                                        {uniqueCategories.map((cat) => (
                                            <option key={cat.id} value={cat.type}>
                                                {cat.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                            <IconButton
                                type="submit"
                                className="btn btn-danger"
                                icon={MdAddCircle}
                                disabled={isUpdating}
                            >
                                Registrar
                            </IconButton>
                            <IconButton
                                className="btn btn-primary"
                                type="button"
                                icon={FaSearch}
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsultIncident"
                                disabled={isUpdating}
                            >
                                Consultar
                            </IconButton>

                            <IconButton
                                className="btn btn-secondary"
                                type="button"
                                icon={FaRegEdit}
                                data-bs-toggle="modal"
                                data-bs-target="#modalUpdateIncident"
                                disabled={isUpdating}
                            >
                                Actualizar
                            </IconButton>

                            <IconButton
                                className="btn btn-warning"
                                type="button"
                                icon={FaTrash}
                                data-bs-toggle="modal"
                                data-bs-target="#modalDeleteIncident"
                                disabled={isUpdating}
                            >
                                Eliminar
                            </IconButton>
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
                                            clearIncidentFormFields();
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                            <IconButton
                                className="btn btn-success" type='button' icon={FaFileExcel} title="Exportar a Excel" aria-label="Exportar a Excel" disabled={isUpdating}
                                onClick={handleExcelDownload}
                            >
                                Excel
                            </IconButton>
                            <IconButton
                                className="btn btn-warning" icon={FaFilePdf} title="Exportar a PDF" aria-label="Exportar a PDF" disabled={isUpdating}
                                type='button' onClick={handlePdfDownload}
                            >
                                PDF
                            </IconButton>
                        </div>
                    </div>
                </form>
            </fieldset>
            <hr />
            {/* Modal de consulta */}
            <div className="modal fade" id="modalConsultIncident" tabIndex="-1" aria-labelledby="modalConsultIncidentLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalConsultIncidentLabel">Consultar Departamento por ID</h1>
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
                                onClick={handleConsultIncident}
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
            <div className="modal fade" id="modalUpdateIncident" tabIndex="-1" aria-labelledby="modalUpdateIncidentLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUpdateIncidentLabel">Actualizar departamento</h5>
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
                            <button className="btn btn-primary" onClick={handleFetchIncidentForUpdate} data-bs-dismiss="modal">Buscar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para pedir ID de eliminar */}
            <div className="modal fade" id="modalDeleteIncident" tabIndex="-1" aria-labelledby="modalDeleteIncidentLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalDeleteIncidentLabel">Eliminar departamento</h5>
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
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteIncident}>Eliminar departamento</button>
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
export default IncidentForm;