import axios from 'axios';
import { getAuthHeader } from '../../Utils/Auth';

export const getAllIncidents =async()=>{
    try {
        const response = await axios.get("http://localhost:8080/api/ucv/getAllIncidents",{
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        return[];
    }
};