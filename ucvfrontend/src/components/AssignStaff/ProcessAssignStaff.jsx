import axios from 'axios';
import { getAuthHeader } from '../../Utils/Auth';

export const getAllIncidents = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/ucv/getAllIncidents", {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const gettAllAdmins = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/ucv/staffRole", {
            headers: getAuthHeader()
        });
        return respone.data;
    } catch (error) {
        return [];
    }
};

export const registerAssign = async (AssignData) => {
    try {
        const respone = await axios.post("http://localhost:8080/api/ucv/assignStaffSave", AssignData, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
        });
        return respone.data;
    } catch (error) {

    }
};

export const getAssignId = async (id) => {
    try {
        const response = await axios.get("http://localhost:8080/api/ucv/assignStaffList", {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
        });
        return response.data.find(assignStaff => String(assignStaff.id) === String(id));
    } catch (error) {

    }
};

export const updateAssign = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/ucv/assignStaffUpdate/${id}`, data, {
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

export const deleteAssign = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/ucv/assignStaddDelete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const excelDownload = async () => {
    try {
        const response = await axios.post("http://localhost:8080/api/ucv/assignStaffExcel", {}, {
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
        const response = await axios.post("http://localhost:8080/api/ucv/assignStaffPDF", {}, {
            headers: getAuthHeader(),
            responseType: 'blob',
        });
        return response;
    } catch (error) {
        console.error("Error al descargar el archivo PDF:", error);
    }
}