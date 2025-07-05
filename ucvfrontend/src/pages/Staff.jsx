import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffForm from "../components/Staff/StaffForm/StaffForm";
import StaffTable from "../components/Staff/StaffTable/StaffTable";
import { getAuthHeader } from '../Utils/Auth';

function Staff() {
    const [staffList, setStaffList] = useState([]);

    const fetchStaffList = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/ucv/staffList",
                {
                    headers: getAuthHeader(),
                }
            );
            setStaffList(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Backend error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("No response from backend:", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
        }
    };

    useEffect(() => {
        fetchStaffList();
    }, []);

    const handleStaffAdded = () => {
        fetchStaffList();  // Refresca desde el servidor
    };

    return (
        <>
            <StaffForm onStaffAdded={handleStaffAdded} />
            <StaffTable staffList={staffList} />
        </>
    );
}

export default Staff;