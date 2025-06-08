import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffForm from "../components/Staff/StaffForm/StaffForm";
import StaffTable from "../components/Staff/StaffTable/StaffTable";

function Staff() {
    const [staffList, setStaffList] = useState([]);

    const fetchStaffList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/ucv/staffList");
            setStaffList(response.data);
        } catch (error) {
            console.error(error);
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