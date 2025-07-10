import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './StaffForm.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from 'sonner'
import { getAuthHeader } from '../../../Utils/Auth';
import IconButton from '../../IconButton';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash, FaSave } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';

const StaffForm = ({ onStaffAdded }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [cargo, setCargo] = useState("");

    const [showPassword, setShowPassword] = useState(false); // Controla visibilidad

    // Estado para el modal de consulta
    const [consultId, setConsultId] = useState("");
    const [consultResult, setConsultResult] = useState(null);

    const [updateId, setUpdateId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateModalId, setUpdateModalId] = useState("");

    const [delateId, setDelateId] = useState("")
    const [delateResult, setDelateResult] = useState(null);

    const clearFormFields = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setNickname("");
        setPassword("");
        setCargo("");
    };

    const validateForm = () => {
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !phone.trim() || !nickname.trim() || !password.trim()) {
            toast.warning("Todos los campos son obligatorios.", {
                duration: 3000,
            });
            return false;
        }
        if (!cargo) {
            toast.warning("Debe seleccionar un cargo.", {
                duration: 3000,
            });
            return false;
        }
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
            await axios.post(
                "http://localhost:8080/api/ucv/register",
                StaffData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeader(),
                    },
                }
            );
            // Limpiar campos tras registro exitoso
            clearFormFields();
            // Notificar al padre que se agregó un staff
            toast.success("Usuario registrado correctamente.", {
                duration: 3000,
            });
            if (onStaffAdded) onStaffAdded();
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx error
                toast.error("Correo ya existente", {
                    duration: 3000,
                });
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
        if (!consultId) {
            toast.error("Debe ingresar un ID.", {
                duration: 3000,
            });
            return;
        }
        try {
            const res = await axios.get(
                `http://localhost:8080/api/ucv/staffList`,
                { headers: getAuthHeader() }
            );
            // Buscar el usuario por ID en la lista (puedes cambiar a un endpoint específico si existe)
            const user = res.data.find(u => String(u.id) === String(consultId));
            if (user) {
                setConsultResult(user);
            } else {
                toast.error("Usuario no encontrado.", {
                    duration: 3000,
                });
            }
        } catch (err) {
            toast.error("Error al consultar el usuario.", {
                duration: 3000,
            });
        }
    };

    // Busca el usuario y rellena los campos
    const handleFetchForUpdate = async () => {
        if (!updateModalId) {
            toast.error("Ingrese el ID del usuario a actualizar.", {
                duration: 3000,
            });
            return;
        }
        try {
            const res = await axios.get(
                "http://localhost:8080/api/ucv/staffList",
                { headers: getAuthHeader() }
            );
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
                toast.error("Usuario no encontrado.", {
                    duration: 3000,
                });
            }
        } catch (error) {
            toast.error("Error al buscar el usuario.", {
                duration: 3000,
            });
        }
    };

    // Actualiza el usuario
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateId) {
            toast.error("ID no definido.", {
                duration: 3000,
            });
            return;
        }
        if (!validateForm()) return;
        const StaffData = {
            firstname, lastname,
            email, phone, nickname, password, cargo
        };
        try {
            await axios.put(
                `http://localhost:8080/api/ucv/staffUpdate/${updateId}`,
                StaffData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeader(),
                    },
                }
            );
            toast.success("Usuario actualizado correctamente.", {
                duration: 3000,
            });
            // Limpiar campos tras actualización
            clearFormFields();
            setIsUpdating(false);
            if (onStaffAdded) onStaffAdded();
        } catch (error) {
            toast.error("Error al actualizar el usuario.", {
                duration: 3000,
            });
        }
    };

    const handleDelateConsult = async () => {
        if (!delateId) {
            toast.error("Debe ingresar un ID.", {
                duration: 3000,
            });
            return;
        }
        try {
            const res = await axios.get(
                `http://localhost:8080/api/ucv/staffList`,
                { headers: getAuthHeader() }
            );
            const user = res.data.find(u => String(u.id) === String(delateId));
            if (user) {
                setDelateResult(user);
            } else {
                toast.error("Usuario no encontrado.", {
                    duration: 3000,
                });
            }
        } catch (err) {
            toast.error("Error al consultar el usuario.", {
                duration: 3000,
            });
        }
    };


    const handleDelate = async (e) => {
        e.preventDefault();
        if (!delateId) {
            toast.error("ID no definido.", { duration: 3000 });
            return;
        }
        try {
            await axios.delete(
                `http://localhost:8080/api/ucv/staffDelete/${delateId}`,
                { headers: getAuthHeader() }
            );
            toast.success("Usuario eliminado correctamente.", { duration: 3000 });
        } catch (error) {
            // Si el backend responde con 200/204 pero axios lo toma como error, igual refresca
            toast.error("Error al eliminar al usuario.", { duration: 3000 });
        } finally {
            setDelateId("");
            setDelateResult(null);
            if (onStaffAdded) onStaffAdded();
        }
    }

    const handleExcelExport = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/ucv/staffExcel',
                {}, // cuerpo vacío
                {
                    responseType: 'blob',
                    headers: getAuthHeader(),
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'staff.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Error al descargar el archivo.", {
                duration: 3000,
            });
        }
    }

    const handlePdfExport = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/ucv/staffPDF',
                {}, // cuerpo vacío
                {
                    responseType: 'blob',
                    headers: getAuthHeader(),
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'staff.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Error al descargar el archivo.", {
                duration: 3000,
            });
        }
    };
    return (
        <>
            <form onSubmit={isUpdating ? handleUpdate : handleSave}>
                <fieldset className="p-3 bg-light rounded border">
                    <legend className="fw-bold">Registro de personal</legend>
                    <div className='row mb-2'>

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
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control pe-5" // Espacio a la derecha para el ícono
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '15px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            color: '#6c757d'
                                        }}
                                    />
                                </div>
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
                            <IconButton
                                type="submit"
                                className="btn btn-danger"
                                disabled={isUpdating}
                                icon={MdAddCircle}
                            >
                                Registrar
                            </IconButton>
                            <IconButton
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsult"
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
                                data-bs-target="#modalUpdate"
                                disabled={isUpdating}
                                icon={FaRegEdit}
                            >
                                Actualizar
                            </IconButton>
                            <IconButton
                                className="btn btn-warning"
                                disabled={isUpdating}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDelate"
                                icon={FaTrash}
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
                                            clearFormFields();
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                            <IconButton
                                className="btn btn-success" type='button' onClick={handleExcelExport} disabled={isUpdating} icon={FaFileExcel} title="Exportar a Excel" aria-label="Exportar a Excel"
                            >
                                Excel
                            </IconButton>
                            <IconButton
                                className="btn btn-warning" disabled={isUpdating} icon={FaFilePdf} title="Exportar a PDF" aria-label="Exportar a PDF"
                                type='button' onClick={handlePdfExport}
                            >
                                PDF
                            </IconButton>
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
                            {delateResult && (
                                <>
                                    <div className="custom-alert-success mt-2 mb-2">
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