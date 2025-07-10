import axios from 'axios';
import { getAuthHeader } from '../../Utils/Auth';

export const getAllAssign = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/ucv/assignStaffList`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveReport = async (data) => {
    try {
        const respone = await axios.post(`http://localhost:8080/api/ucv/saveReport`,data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        })
        return respone.data;
    } catch (error) {
        console.log(error);
    }
};

export const getReportId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/ucv/getAllReport`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });
        return response.data.find(report => String(report.id) === String(id));
    } catch (error) {
        console.log(error);
    }
}

export const updateReport = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/ucv/updateReport/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const delateReport = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/ucv/deleteReport/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const excelDownload = async () => {
  try {
    console.log(getAuthHeader()); // Verifica el token aquí
    const response = await axios.post("http://localhost:8080/api/ucv/reportExcel", {},{
      headers: getAuthHeader(),
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Error al descargar el archivo Excel:", error);
  }
}

export const pdfDownload = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/ucv/reportPDF", {},{
      headers: getAuthHeader(),
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Error al descargar el archivo PDF:", error);
  }
}