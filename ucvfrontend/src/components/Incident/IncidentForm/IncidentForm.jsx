import 'bootstrap/dist/css/bootstrap.min.css';
import './IncidentForm.css'
import { getAllDeparments, getAllCategories, registerIncident } from '../ProcessIncident';
import IconButton from '../../IconButton';
import { MdAddCircle } from 'react-icons/md';
import { FaSearch, FaRegEdit, FaTrash } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import React, { useState, useEffect } from 'react';

function IncidentForm() {

    const [description, setDescription] = useState("");
    const [incidentDate, setIncidentDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const [category, setCategory] = useState([]);

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
                alert("Por favor complete todos los campos.");
                return;
            }

            const incidentData = {
                description: description,
                incidenDate: incidentDate,
                registeredDate: new Date().toISOString(),
                registeredUser: nickname,
                prioritylevel: "MEDIA",
                area: selectedCode, // 👈 Aquí se llena el campo area
                user: { id: userId },
                deparment: { id: selectedDepartment.id },
                category: { id: selectedCategoryObj.id },
            };

            await registerIncident(incidentData);
            alert("Incidencia registrada exitosamente.");

            setDescription("");
            setIncidentDate("");
            setSelectedDepartmentName("");
            setSelectedCode("");
            setSelectedCategory("");
        } catch (error) {
            console.error("Error al registrar incidencia:", error);
            alert("Error al registrar la incidencia.");
        }
    };


    return (
        <>
            <fieldset className="p-3 bg-light rounded border">
                <legend className="fw-bold mb-4">Registrar incidencias informaticas</legend>
                <form>
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
                                onClick={handleSave}
                            >
                                Registrar
                            </IconButton>
                            <IconButton
                                className="btn btn-primary"
                                type="button"
                                icon={FaSearch}
                            >
                                Consultar
                            </IconButton>
                            <IconButton
                                className="btn btn-secondary"
                                type="button"
                                icon={FaRegEdit}
                            >
                                Actualizar
                            </IconButton>
                            <IconButton
                                className="btn btn-warning"
                                type="button"
                                icon={FaTrash}
                            >
                                Eliminar
                            </IconButton>
                        </div>
                        <div className='col-md-2 d-flex justify-content-end gap-4 flex-wrap'>
                            <IconButton
                                className="btn btn-success" type='button' icon={FaFileExcel} title="Exportar a Excel" aria-label="Exportar a Excel"
                            >
                                Excel
                            </IconButton>
                            <IconButton
                                className="btn btn-warning" icon={FaFilePdf} title="Exportar a PDF" aria-label="Exportar a PDF"
                            >
                                PDF
                            </IconButton>
                        </div>
                    </div>
                </form>
            </fieldset>
            <hr />
        </>
    );
}
export default IncidentForm;