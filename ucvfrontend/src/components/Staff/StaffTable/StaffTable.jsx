import { useState, useEffect } from "react";
import "./StaffTable.css";

function StaffTable({ staffList }) {
    const [sortOption, setSortOption] = useState("Id");
    const [sortedList, setSortedList] = useState([...staffList]);

    useEffect(() => {
        const list = [...staffList];
        list.sort((a, b) => {
            switch (sortOption) {
                case "Id":
                    return a.id - b.id;
                case "Apellido":
                    return a.lastname.localeCompare(b.lastname);
                case "Usuario":
                    return a.nickname.localeCompare(b.nickname);
                case "Rol":
                    return a.role.localeCompare(b.role);
                case "Correo":
                    return a.email.localeCompare(b.email);
                case "Cargo":
                    return a.cargo.localeCompare(b.cargo);
                default:
                    return 0;
            }
        });
        setSortedList(list);
    }, [sortOption, staffList]); // se ejecuta cuando cambia el criterio o la lista original

    return (
        <div className="d-flex flex-wrap bg-light p-3 rounded border col-12 gap-2">
            <div className="col-12 col-md-2 mt-md-0" style={{ width: "100px" }}>
                <label className="fw-medium">Ordenar por</label>
                <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="Id">Id</option>
                    <option value="Apellido">Apellido</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Rol">Rol</option>
                    <option value="Correo">Correo</option>
                    <option value="Cargo">Cargo</option>
                </select>
            </div>
            <div className="flex-grow-1 col-12 col-md-10">
                <table className="table tmn table-bordered text-center">
                    <thead className="table-info">
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Rol</th>
                            <th>Cargo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedList.map((staff) => (
                            <tr key={staff.id}>
                                <td>{staff.id}</td>
                                <td>{staff.firstname}</td>
                                <td>{staff.lastname}</td>
                                <td>{staff.email}</td>
                                <td>{staff.phone}</td>
                                <td>{staff.nickname}</td>
                                <td className="password-ellipsis">{staff.password}</td>
                                <td>{staff.role}</td>
                                <td>{staff.cargo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffTable;
