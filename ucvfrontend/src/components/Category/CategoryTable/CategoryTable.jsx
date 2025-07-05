import { useState, useEffect } from "react";
import "./CategoryTable.css";

function CategoryTable({ categoryList = [] }) {
    const [sortOption, setSortOption] = useState("Id");
    const [filterId, setFilterId] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        let list = [...categoryList];

        // Filtrado
        if (filterId) {
            list = list.filter(cat => String(cat.id).includes(filterId));
        }
        if (filterType) {
            list = list.filter(cat => cat.type && cat.type.toLowerCase().includes(filterType.toLowerCase()));
        }
        if (filterPriority) {
            list = list.filter(cat => cat.prioritylevel === filterPriority);
        }
        if (filterCategory) {
            list = list.filter(cat => cat.category === filterCategory);
        }

        // Ordenamiento
        list.sort((a, b) => {
            switch (sortOption) {
                case "Id":
                    return a.id - b.id;
                case "Tipo":
                    return (a.type || "").localeCompare(b.type || "");
                case "Nivel de prioridad":
                    // Ordenar de Alto > Medio > Bajo
                    const priorityOrder = { "Alto": 1, "Medio": 2, "Bajo": 3 };
                    return (priorityOrder[a.prioritylevel] || 99) - (priorityOrder[b.prioritylevel] || 99);
                case "Categoria":
                    return (a.category || "").localeCompare(b.category || "");
                default:
                    return 0;
            }
        });

        setFilteredList(list);
    }, [categoryList, sortOption, filterId, filterType, filterPriority, filterCategory]);

    return (
        <>
            <div className="d-flex flex-wrap bg-light p-3 rounded border col-12 gap-2">
                {/* Ordenamiento */}
                <div style={{ width: "200px" }} className="col-12 col-md-3 mt-md-0">
                    <label className="fw-medium">Ordenar por</label>
                    <select
                        className="form-select mb-2"
                        value={sortOption}
                        onChange={e => setSortOption(e.target.value)}
                    >
                        <option value="Id">Id</option>
                        <option value="Tipo">Tipo</option>
                        <option value="Nivel de prioridad">Nivel de prioridad</option>
                        <option value="Categoria">Categoria</option>
                    </select>
                    <button
                        className="btn btn-outline-secondary w-100 mb-2 mt-2"
                        onClick={() => {
                            setFilterId("");
                            setFilterType("");
                            setFilterPriority("");
                            setFilterCategory("");
                        }}
                    >
                        Limpiar
                    </button>
                    <div className="gap-2 d-flex flex-column">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar por Tipo"
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                        />
                        <select
                            className="form-select"
                            value={filterPriority}
                            onChange={e => setFilterPriority(e.target.value)}
                        >
                            <option value="">Filtrar por Prioridad</option>
                            <option value="Alto">Alto</option>
                            <option value="Medio">Medio</option>
                            <option value="Bajo">Bajo</option>
                        </select>
                        <select
                            className="form-select"
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                        >
                            <option value="">Filtrar por Categoria</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                        </select>
                    </div>
                    {/* El botón es opcional, el ordenamiento es reactivo */}
                </div>
                <div className="flex-grow-1 col-12 col-md-9">
                    <table className="table tmn table-bordered text-center">
                        <thead className="table-info">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Nivel de prioridad</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Sin datos</td>
                                </tr>
                            ) : (
                                filteredList.map(cat => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.type}</td>
                                        <td>{cat.prioritylevel}</td>
                                        <td>{cat.category}</td>
                                        <td className="desc-ellipsis">{cat.description}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CategoryTable;