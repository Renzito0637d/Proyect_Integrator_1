import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './StaffForm.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffForm = ({ onStaffAdded }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [cargo, setCargo] = useState("");

    // Estado para el modal de consulta
    const [consultId, setConsultId] = useState("");
    const [consultResult, setConsultResult] = useState(null);
    const [consultError, setConsultError] = useState("");

    const [updateId, setUpdateId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateModalId, setUpdateModalId] = useState("");

    const [delateId, setDelateId] = useState("")
    const [delateResult, setDelateResult] = useState(null);
    const [delateError, setDelateError] = useState("");

    const [formError, setFormError] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (formError) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [formError]);

    const validateForm = () => {
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !phone.trim() || !nickname.trim() || !password.trim()) {
            setFormError("Todos los campos son obligatorios.");
            return false;
        }
        if (!cargo) {
            setFormError("Debe seleccionar un cargo.");
            return false;
        }
        setFormError("");
        return true;
    };

    const handleOnlyNumbersInput = setter => e => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 9) {
      setter(val);  
    }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const StaffData = {
            firstname, lastname,
            email, phone, nickname, password, cargo
        }
        try {
            await axios.post("http://localhost:8080/api/ucv/register",
                StaffData, {
                // Configuración de la solicitud
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // Limpiar campos tras registro exitoso
            setFirstname("");
            setLastname("");
            setEmail("");
            setPhone("");
            setNickname("");
            setPassword("");
            setCargo("");
            // Notificar al padre que se agregó un staff
            if (onStaffAdded) onStaffAdded();
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                alert("Error: Credenciales incorrectas");
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                console.error("No se recibió respuesta del servidor:", error.request);
            } else {
                // Algo más causó el error
                console.error("Error al configurar la solicitud:", error.message);
            }
        }
    };

    // Función para autogenerar el nickname
    const handleAutogenerateNickname = () => {
        // Tomar el primer nombre y primer apellido (si existen)
        const first = firstname.trim().split(" ")[0] || "";
        const last = lastname.trim().split(" ")[0] || "";
        if (first && last) {
            setNickname((first + "." + last).toLowerCase());
        } else if (first) {
            setNickname(first.toLowerCase());
        } else {
            setNickname("");
        }
    };

    // Función para consultar usuario por ID
    const handleConsult = async () => {
        setConsultResult(null);
        setConsultError("");
        if (!consultId) {
            setConsultError("Debe ingresar un ID.");
            return;
        }
        try {
            const res = await axios.get(`http://localhost:8080/api/ucv/staffList`);
            // Buscar el usuario por ID en la lista (puedes cambiar a un endpoint específico si existe)
            const user = res.data.find(u => String(u.id) === String(consultId));
            if (user) {
                setConsultResult(user);
            } else {
                setConsultError("Usuario no encontrado.");
            }
        } catch (err) {
            setConsultError("Error al consultar el usuario.");
        }
    };

    // Busca el usuario y rellena los campos
    const handleFetchForUpdate = async () => {
        if (!updateModalId) {
            alert("Ingrese el ID del usuario a actualizar.");
            return;
        }
        try {
            const res = await axios.get("http://localhost:8080/api/ucv/staffList");
            const user = res.data.find(u => String(u.id) === String(updateModalId));
            if (user) {
                setUpdateId(user.id);
                setFirstname(user.firstname || "");
                setLastname(user.lastname || "");
                setEmail(user.email || "");
                setPhone(user.phone || "");
                setNickname(user.nickname || "");
                setPassword(""); // No mostrar la contraseña actual
                setCargo(user.cargo || "");
                setIsUpdating(true);
            } else {
                alert("Usuario no encontrado.");
            }
        } catch (error) {
            alert("Error al buscar el usuario.");
        }
    };

    // Actualiza el usuario
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateId) {
            alert("ID no definido.");
            return;
        }
        if (!validateForm()) return;
        const StaffData = {
            firstname, lastname,
            email, phone, nickname, password, cargo
        };
        try {
            await axios.put(`http://localhost:8080/api/ucv/staffUpdate/${updateId}`, StaffData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Usuario actualizado correctamente.");
            // Limpiar campos tras actualización
            setUpdateId("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPhone("");
            setNickname("");
            setPassword("");
            setCargo("");
            setIsUpdating(false);
            if (onStaffAdded) onStaffAdded();
        } catch (error) {
            alert("Error al actualizar el usuario.");
        }
    };

    const handleDelateConsult = async () => {
        setDelateResult(null);
        setDelateError("");
        if (!delateId) {
            setDelateError("Debe ingresar un ID.");
            return;
        }
        try {
            const res = await axios.get(`http://localhost:8080/api/ucv/staffList`);
            const user = res.data.find(u => String(u.id) === String(delateId));
            if (user) {
                setDelateResult(user);
            } else {
                setDelateError("Usuario no encontrado.");
            }
        } catch (err) {
            setDelateError("Error al consultar el usuario.");
        }
    };


    const handleDelate = async (e) => {
        e.preventDefault();
        if (!delateId) {
            alert("ID no definido.");
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/ucv/staffDelete/${delateId}`)
            if (onStaffAdded) onStaffAdded();
        } catch (error) {
            alert("Error al actualizar el eliminar al usuario.");
        }
    }

    const handleExcelExport = async () => {
        try {
            axios.post('http://localhost:8080/api/ucv/staffExcel', {}, {
                responseType: 'blob'
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'staff.xlsx');
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
            {showToast && formError && (
                <div className='noti2'>
                    {formError}
                </div>
            )}
            <form onSubmit={isUpdating ? handleUpdate : handleSave}>
                <fieldset className="p-3 bg-light rounded border">
                    <legend className="fw-bold">Registro de personal</legend>
                    <div className='row col-md-12 mb-2'>

                        <div className="col-md-3 d-grid gap-2 mb-2">
                            <div>
                                <label className="fw-medium">Nombre</label>
                                <input type="text" className="form-control" placeholder="Ingrese el nombre del personal"
                                    value={firstname} onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="fw-medium">Apellido</label>
                                <input type="text" className="form-control" placeholder="Ingrese el apellido del personal"
                                    value={lastname} onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 d-grid gap-2 mb-2">
                            <div>
                                <label className="fw-medium">Correo</label>
                                <input type="text" className="form-control" placeholder="Ingrese el correo del personal"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="fw-medium">Telefono móvil</label>
                                <input type="text" className="form-control" placeholder="Ingrese el telefóno del personal"
                                    value={phone} onChange={handleOnlyNumbersInput(setPhone)} 
                                />
                            </div>
                        </div>
                        <div className="col-md-3 d-grid gap-2 mb-2">
                            <div>
                                <label className="fw-medium">Contraseña</label>
                                <input type="text" className="form-control" placeholder="Ingrese la contraseña del personal"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="fw-medium">Cargo</label>
                                <select
                                    className="form-select"
                                    value={cargo}
                                    onChange={e => setCargo(e.target.value)}
                                >
                                    <option value="">[Seleccionar]</option>
                                    <option value="Admin">Administrador de sistemas</option>
                                    <option value="Soporte">Soporte técnico</option>
                                    <option value="Redes">Especialista de redes</option>
                                    <option value="Seguridad">Seguridad informática</option>
                                    <option value="Estudiante">Estudiante</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 d-grid gap-2 ">
                            <div>
                                <label className="fw-medium">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese el usuario del personal o generelo"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAutogenerateNickname}
                                >
                                    Autogenerar usuario
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-10 d-flex justify-content-start gap-4 flex-wrap'>
                            <button type="submit" className="btn btn-danger" disabled={isUpdating}>Registrar</button>
                            {/* Botón para abrir el modal de consulta */}
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsult"
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
                                data-bs-target="#modalUpdate"
                                disabled={isUpdating}
                            >
                                Actualizar
                            </button>
                            <button
                                className="btn btn-warning"
                                disabled={isUpdating}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDelate"
                            >
                                Eliminar
                            </button>
                            {isUpdating && (
                                <>
                                    <button
                                        className="btn btn-success ml-2"
                                        type="submit"
                                    >
                                        Guardar actualización
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={() => {
                                            setIsUpdating(false);
                                            setUpdateId("");
                                            setFirstname("");
                                            setLastname("");
                                            setEmail("");
                                            setPhone("");
                                            setNickname("");
                                            setPassword("");
                                            setCargo("");
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
            <hr className="border border-danger border-2 opacity-75" />

            {/* Modal de consulta */}
            <div className="modal fade custom-modal" id="modalConsult" tabIndex="-1" aria-labelledby="modalConsultLabel" aria-hidden="true">
                <div className="modal-dialog custom-modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header custom-modal-header">
                            <h1 className="modal-title fs-5 custom-modal-title" id="modalConsultLabel">Consultar Usuario por ID</h1>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <div className="mb-3">
                                <label className="form-label custom-form-label">ID de usuario</label>
                                <input
                                    type="number"
                                    className="form-control custom-input"
                                    value={consultId}
                                    onChange={e => setConsultId(e.target.value)}
                                    placeholder="Ingrese el ID"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn custom-btn-primary mb-3"
                                onClick={handleConsult}
                            >
                                Consultar
                            </button>
                            {consultError && (
                                <div className="alert custom-alert-danger mt-2">{consultError}</div>
                            )}
                            {consultResult && (
                                <div className=" custom-alert-success mt-2">
                                    <strong>Nombre:</strong> {consultResult.firstname} <br />
                                    <strong>Apellido:</strong> {consultResult.lastname} <br />
                                    <strong>Email:</strong> {consultResult.email} <br />
                                    <strong>Teléfono:</strong> {consultResult.phone} <br />
                                    <strong>Usuario:</strong> {consultResult.nickname} <br />
                                    <strong>Cargo:</strong> {consultResult.cargo}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer custom-modal-footer">
                            <button type="button" className="btn custom-btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para pedir ID de actualización */}
            <div className="modal fade custom-modal" id="modalUpdate" tabIndex="-1" aria-labelledby="modalUpdateLabel" aria-hidden="true">
                <div className="modal-dialog custom-modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header custom-modal-header">
                            <h5 className="modal-title fs-5 custom-modal-title" id="modalUpdateLabel">Actualizar usuario</h5>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>Ingrese el ID del usuario a actualizar:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={updateModalId}
                                onChange={e => setUpdateModalId(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer custom-modal-footer">
                            <button className="btn btn-primary" onClick={handleFetchForUpdate} data-bs-dismiss="modal">Buscar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para pedir ID de eliminar */}
            <div className="modal fade custom-modal" id="modalDelate" tabIndex="-1" aria-labelledby="modalDelateLabel" aria-hidden="true">
                <div className="modal-dialog custom-modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header custom-modal-header">
                            <h5 className="modal-title fs-5 custom-modal-title" id="modalDelateLabel">Eliminar usuario</h5>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body custom-modal-body">
                            <div className="mb-3">
                                <label className="form-label custom-form-label">ID de usuario</label>
                                <input
                                    type="number"
                                    className="form-control custom-input"
                                    value={delateId}
                                    onChange={e => setDelateId(e.target.value)}
                                    placeholder="Ingrese el ID"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn custom-btn-primary mb-3"
                                onClick={handleDelateConsult}

                            >
                                Consultar
                            </button>
                            {delateError && (
                                <div className="alert custom-alert-danger mt-2">{delateError}</div>
                            )}
                            {delateResult && (
                                <>
                                    <div className="alert custom-alert-success mt-2">
                                        <strong>Nombre:</strong> {delateResult.firstname} <br />
                                        <strong>Apellido:</strong> {delateResult.lastname} <br />
                                        <strong>Email:</strong> {delateResult.email} <br />
                                        <strong>Teléfono:</strong> {delateResult.phone} <br />
                                        <strong>Usuario:</strong> {delateResult.nickname} <br />
                                        <strong>Cargo:</strong> {delateResult.cargo}
                                    </div>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelate}>Eliminar usuario</button>
                                </>
                            )}

                        </div>
                        <div className="modal-footer custom-modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default StaffForm;