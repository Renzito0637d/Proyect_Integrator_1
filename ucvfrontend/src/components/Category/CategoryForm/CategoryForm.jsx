import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../../../Utils/Auth';
import { toast } from 'sonner';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import IconButton from '../../IconButton';

function CategoryForm({ onCategoryChanged }) {
    // Estados para el formulario principal
    const [type, setType] = useState("");
    const [prioritylevel, setPrioritylevel] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // Estados para consulta
    const [consultId, setConsultId] = useState("");
    const [consultResult, setConsultResult] = useState(null);

    // Estados para actualización
    const [updateId, setUpdateId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateModalId, setUpdateModalId] = useState("");

    // Estados para eliminación
    const [deleteId, setDeleteId] = useState("");
    const [deleteResult, setDeleteResult] = useState(null);

    const clearFormFields = () => {
        setType(""); setPrioritylevel(""); setCategory(""); setDescription("");
    };

    const validateFields = () => {
        if (!type.trim() || !prioritylevel.trim() || !category.trim() || !description.trim()) {
            toast.error("Todos los campos son obligatorios.", { duration: 3000 });
            return false;
        }
        return true;
    };

    // Registrar nueva categoría
    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        const data = { type, prioritylevel, category, description };
        try {
            await axios.post("http://localhost:8080/api/ucv/categorySave", data, {
                headers: { "Content-Type": "application/json", ...getAuthHeader() }
            });
            clearFormFields();
            toast.success("Categoría registrada correctamente.", { duration: 3000 });
            if (onCategoryChanged) onCategoryChanged();
        } catch (error) {
            toast.error("Error al registrar la categoría.", { duration: 3000 });
        }
    };

    // Consultar categoría por ID
    const handleConsult = async () => {
        setConsultResult(null);
        if (!consultId) {
            toast.error("Debe ingresar un ID.", { duration: 3000 });
            return;
        }
        try {
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList",
                {
                    headers: getAuthHeader()
                }
            );
            // Comparar como número para evitar problemas de tipo
            const cat = res.data.find(c => Number(c.id) === Number(consultId));
            if (cat) {
                setConsultResult(cat);
                toast.success("Categoría encontrada.", { duration: 3000 });
            }
            else {
                toast.error("Categoría no encontrada.", { duration: 3000 });
            }
        } catch {
            toast.error("Error al consultar la categoría.", { duration: 3000 });
        }
    };

    // Buscar para actualizar
    const handleFetchForUpdate = async () => {
        if (!updateModalId) {
            toast.error("Ingrese el ID de la categoría a actualizar.", { duration: 3000 });
            return;
        }
        try {
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList",
                {
                    headers: getAuthHeader()
                }
            );
            const cat = res.data.find(c => String(c.id) === String(updateModalId));
            if (cat) {
                setUpdateId(cat.id);
                setType(cat.type || "");
                setPrioritylevel(cat.prioritylevel || "");
                setCategory(cat.category || "");
                setDescription(cat.description || "");
                setIsUpdating(true);
                toast.success("Categoría cargada para actualizar.", { duration: 3000 });
            } else {
                toast.error("Categoría no encontrada.", { duration: 3000 });
            }
        } catch {
            toast.error("Error al buscar la categoría.", { duration: 3000 });
        }
    };

    // Actualizar categoría
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateId) {
            toast.error("ID no definido.", { duration: 3000 });
            return;
        }
        if (!validateFields()) return;
        const data = { type, prioritylevel, category, description };
        try {
            await axios.put(`http://localhost:8080/api/ucv/categoryUpdate/${updateId}`, data, {
                headers: { "Content-Type": "application/json", ...getAuthHeader() }
            });
            toast.success("Categoría actualizada correctamente.", { duration: 3000 });
            clearFormFields();
            setIsUpdating(false);
            if (onCategoryChanged) onCategoryChanged();
        } catch {
            toast.error("Error al actualizar la categoría.", { duration: 3000 });
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
            const res = await axios.get("http://localhost:8080/api/ucv/categoryList", {
                headers: getAuthHeader()
            });
            const cat = res.data.find(c => String(c.id) === String(deleteId));
            if (cat) {
                setDeleteResult(cat);
                toast.success("Categoría encontrada.", { duration: 3000 });
            }
            else {
                toast.error("Categoría no encontrada.", { duration: 3000 });
            }
        } catch {
            toast.error("Error al consultar la categoría.", { duration: 3000 });
        }
    };

    // Eliminar categoría
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!deleteId) {
            toast.error("ID no definido.", { duration: 3000 });
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/ucv/categoryDelete/${deleteId}`, {
                headers: getAuthHeader()
            });
            setDeleteId(""); setDeleteResult(null);
            toast.success("Categoría eliminada correctamente.", { duration: 3000 });
            if (onCategoryChanged) onCategoryChanged();
        } catch {
            toast.error("Error al eliminar la categoría.", { duration: 3000 });
        }
    };

    const handleExcelExport = async () => {
        try {
            axios.post('http://localhost:8080/api/ucv/categoryExcel', {}, {
                headers: getAuthHeader(),
                responseType: 'blob',
            }, {
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
            const response = await axios.post('http://localhost:8080/api/ucv/categoryPDF', {}, {
                headers: getAuthHeader(),
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'category.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Archivo PDF descargado correctamente.", { duration: 3000 });
        } catch (error) {
            toast.error('Error al descargar el archivo PDF.', { duration: 3000 });
        }
    }

    return (
        <>
            <form onSubmit={isUpdating ? handleUpdate : handleSave}>
                <fieldset className="p-3 bg-light rounded border">
                    <legend className="fw-bold">Registro de tipos de incidencias</legend>
                    <div className='row'>
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

                    <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                            <IconButton
                                type="submit"
                                className="btn btn-danger"
                                icon={MdAddCircle}
                                disabled={isUpdating}
                            >Registrar</IconButton>
                            <IconButton
                                className="btn btn-primary"
                                type="button"
                                icon={FaSearch}
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsultCategory"
                                onClick={() => {
                                    setConsultId("");
                                    setConsultResult(null);
                                }}
                                disabled={isUpdating}
                            >
                                Consultar
                            </IconButton>
                            <IconButton
                                className="btn btn-secondary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalUpdateCategory"
                                disabled={isUpdating}
                                icon={FaRegEdit}
                            >
                                Actualizar
                            </IconButton>
                            <IconButton
                                className="btn btn-warning"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDeleteCategory"
                                disabled={isUpdating}
                                icon={FaTrash}
                            >
                                Eliminar
                            </IconButton>
                            {isUpdating && (
                                <>
                                    <IconButton className="btn btn-success ml-2" type="submit" icon={FaSave}>
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
                            <IconButton
                                className="btn btn-success"
                                type="button"
                                onClick={handleExcelExport}
                                disabled={isUpdating}
                                icon={FaFileExcel}
                            >
                                Excel
                            </IconButton>
                            <IconButton
                                className="btn btn-warning"
                                type="button"
                                disabled={isUpdating}
                                onClick={handlePdfExport}
                                icon={FaFilePdf}
                            >
                                Pdf
                            </IconButton>
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
                            {consultResult && (
                                <div className="alert-success mt-2">
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