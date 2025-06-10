import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import axios from 'axios';

function CategoryForm({ onCategoryChanged }) {
    // Estados para el formulario principal
    const [type, setType] = useState("");
    const [prioritylevel, setPrioritylevel] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // Estados para consulta
    const [consultId, setConsultId] = useState("");
    const [consultResult, setConsultResult] = useState(null);
    const [consultError, setConsultError] = useState("");

    // Estados para actualización
    const [updateId, setUpdateId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateModalId, setUpdateModalId] = useState("");

    // Estados para eliminación
    const [deleteId, setDeleteId] = useState("");
    const [deleteResult, setDeleteResult] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    // Registrar nueva categoría
    const handleSave = async (e) => {
        e.preventDefault();
        const data = { type, prioritylevel, category, description };
        try {
            await axios.post("http://localhost:8080/api/ucv/categorySave", data, {
                headers: { "Content-Type": "application/json" }
            });
            setType(""); setPrioritylevel(""); setCategory(""); setDescription("");
            if (onCategoryChanged) onCategoryChanged();
        } catch (error) {
            alert("Error al registrar la categoría.");
        }
    };

    // Consultar categoría por ID
    const handleConsult = async () => {
        setConsultResult(null);
        setConsultError("");
        if (!consultId) {
            setConsultError("Debe ingresar un ID.");
            return;
        }
        try {
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList");
            const cat = res.data.find(c => String(c.id) === String(consultId));
            if (cat) setConsultResult(cat);
            else setConsultError("Categoría no encontrada.");
        } catch {
            setConsultError("Error al consultar la categoría.");
        }
    };

    // Buscar para actualizar
    const handleFetchForUpdate = async () => {
        if (!updateModalId) {
            alert("Ingrese el ID de la categoría a actualizar.");
            return;
        }
        try {
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList");
            const cat = res.data.find(c => String(c.id) === String(updateModalId));
            if (cat) {
                setUpdateId(cat.id);
                setType(cat.type || "");
                setPrioritylevel(cat.prioritylevel || "");
                setCategory(cat.category || "");
                setDescription(cat.description || "");
                setIsUpdating(true);
            } else {
                alert("Categoría no encontrada.");
            }
        } catch {
            alert("Error al buscar la categoría.");
        }
    };

    // Actualizar categoría
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateId) {
            alert("ID no definido.");
            return;
        }
        const data = { type, prioritylevel, category, description };
        try {
            await axios.put(`http://localhost:8080/api/ucv/categoryUpdate/${updateId}`, data, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Categoría actualizada correctamente.");
            setUpdateId(""); setType(""); setPrioritylevel(""); setCategory(""); setDescription("");
            setIsUpdating(false);
            if (onCategoryChanged) onCategoryChanged();
        } catch {
            alert("Error al actualizar la categoría.");
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
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList");
            const cat = res.data.find(c => String(c.id) === String(deleteId));
            if (cat) setDeleteResult(cat);
            else setDeleteError("Categoría no encontrada.");
        } catch {
            setDeleteError("Error al consultar la categoría.");
        }
    };

    // Eliminar categoría
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!deleteId) {
            alert("ID no definido.");
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/ucv/categoryDelete/${deleteId}`);
            setDeleteId(""); setDeleteResult(null);
            if (onCategoryChanged) onCategoryChanged();
        } catch {
            alert("Error al eliminar la categoría.");
        }
    };

    const handleExcelExport = async () => {
        try {
            axios.post('http://localhost:8080/api/ucv/categoryExcel', {}, {
                responseType: 'blob'
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'category.xlsx');
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
            <form onSubmit={isUpdating ? handleUpdate : handleSave}>
                <fieldset className="p-3 bg-light rounded border">
                    <legend className="fw-bold">Registro de tipos de incidencias</legend>
                    <div className='row col-md-12'>
                        <div className="col-md-4">
                            <label className="fw-medium">Tipo de incidencia</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del tipo de incidencia"
                                value={type}
                                onChange={e => setType(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 d-grid gap-2 mb-2">
                            <div>
                                <label className="fw-medium">Nivel de prioridad</label>
                                <select
                                    className="form-select"
                                    value={prioritylevel}
                                    onChange={e => setPrioritylevel(e.target.value)}
                                >
                                    <option value="">[Seleccionar]</option>
                                    <option value="Alto">Alto</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Bajo">Bajo</option>
                                </select>
                            </div>
                            <div>
                                <label className="fw-medium">Categoria</label>
                                <select
                                    className="form-select"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="">[Seleccionar]</option>
                                    <option value="Software">Software</option>
                                    <option value="Hardware">Hardware</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5 d-grid gap-2 mb-2">
                            <label className="fw-medium">Descripción</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex'>
                            <div className='col-md-6 d-flex justify-content-start gap-2'>
                                <button type="submit" className="btn btn-danger" disabled={isUpdating}>Registrar</button>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalConsultCategory"
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
                                    data-bs-target="#modalUpdateCategory"
                                    disabled={isUpdating}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalDeleteCategory"
                                    disabled={isUpdating}
                                >
                                    Eliminar
                                </button>
                            </div>
                            <div className='col-md-6 d-flex justify-content-end gap-4'>
                                <button className="btn btn-success" type='button' onClick={handleExcelExport} disabled={isUpdating}>Excel</button>
                                <button className="btn btn-warning" disabled={isUpdating}>Pdf</button>
                            </div>
                            {isUpdating && (
                                <>
                                    <button className="btn btn-success ml-2" type="submit">
                                        Guardar actualización
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={() => {
                                            setIsUpdating(false);
                                            setUpdateId("");
                                            setType("");
                                            setPrioritylevel("");
                                            setCategory("");
                                            setDescription("");
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </fieldset>
            </form>
            <hr className="border border-danger border-2 opacity-75" />

            {/* Modal de consulta */}
            <div className="modal fade" id="modalConsultCategory" tabIndex="-1" aria-labelledby="modalConsultCategoryLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalConsultCategoryLabel">Consultar Categoría por ID</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">ID de categoría</label>
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
                                <div className="alert alert-success mt-2">
                                    <strong>Tipo:</strong> {consultResult.type} <br />
                                    <strong>Nivel de prioridad:</strong> {consultResult.prioritylevel} <br />
                                    <strong>Categoría:</strong> {consultResult.category} <br />
                                    <strong>Descripción:</strong> {consultResult.description}
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
            <div className="modal fade" id="modalUpdateCategory" tabIndex="-1" aria-labelledby="modalUpdateCategoryLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUpdateCategoryLabel">Actualizar categoría</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>Ingrese el ID de la categoría a actualizar:</label>
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
            <div className="modal fade" id="modalDeleteCategory" tabIndex="-1" aria-labelledby="modalDeleteCategoryLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalDeleteCategoryLabel">Eliminar categoría</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">ID de categoría</label>
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
                                        <strong>Tipo:</strong> {deleteResult.type} <br />
                                        <strong>Nivel de prioridad:</strong> {deleteResult.prioritylevel} <br />
                                        <strong>Categoría:</strong> {deleteResult.category} <br />
                                        <strong>Descripción:</strong> {deleteResult.description}
                                    </div>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Eliminar categoría</button>
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

export default CategoryForm;