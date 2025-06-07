import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './StaffForm.css';
import { useState } from 'react';
import axios from 'axios';

const StaffForm = ({ onStaffAdded }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [cargo, setCargo] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        const StaffData = {
            firstname, lastname,
            email, phone, nickname, password, cargo
        }
        try {
            const reponseStaff = await axios.post("http://localhost:8080/api/ucv/register",
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

    return (
        <>
            <form onSubmit={handleSave}>
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
                                value ={phone} onChange={(e) => setPhone(e.target.value)}
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
                                    <option value="admin">Administrador de sistemas</option>
                                    <option value="soporte">Soporte técnico</option>
                                    <option value="redes">Especialista de redes</option>
                                    <option value="seguridad">Seguridad informática</option>
                                    <option value="cliente">Cliente</option>
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
                            <div className='d-flex justify-content-end gap-3 mt-4'>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAutogenerateNickname}
                                >
                                    Autogenerar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <div className='col-md-8 d-flex justify-content-start gap-4 flex-wrap'>
                            <button type="submit" className="btn btn-danger">Registrar</button>
                            <button className="btn btn-primary">Consultar</button>
                            <button className="btn btn-secondary">Actualizar</button>
                            <button className="btn btn-warning">Eliminar</button>
                        </div>
                        <div className='col-md-4 d-flex justify-content-end gap-4'>                            
                            <button className="btn btn-success">Excel</button>
                            <button className="btn btn-warning">Pdf</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            <hr className="border border-danger border-2 opacity-75" />
        </>
    );
}

export default StaffForm;