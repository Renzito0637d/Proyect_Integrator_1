import axios from 'axios';
import { getAuthHeader } from '../../Utils/Auth';

export const getAllDeparments = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/ucv/deparmentList", {
      headers: getAuthHeader(),
    });
    console.log("Departamentos recibidos:", response.data); // 👈 Verifica formato
    return response.data;
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    return []; // 👈 Siempre devolver un array
  }
};


export const getAllCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/ucv/categoryList", {
      headers: getAuthHeader(),
    });
    console.log("Categorías recibidas:", response.data); // 👈
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return []; // 👈 Siempre devolver un array aunque falle
  }
};



export const registerIncident = async (incidentData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/ucv/createIncident", incidentData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar la incidencia:", error);
    throw error;
  }
};
