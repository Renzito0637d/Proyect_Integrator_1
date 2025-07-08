import React, { useEffect, useState } from 'react';
import AssignStaffForm from '../components/AssignStaff/AssignStaffForm/AssignStaffForm';
import AssignStaffTable from '../components/AssignStaff/AssignStaffTable/AssignStaffTable';
import axios from 'axios';
import { getAuthHeader } from '../Utils/Auth';

function AssignStaff() {

  const [assignStaffs, setAssignStaffs] = useState([]);

  const [des, setDes] = useState("");

  const fetchAssign = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/ucv/assignStaffList`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      })
      setAssignStaffs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssign();
  },[]);

  const handleAssignChange = () => {
    fetchAssign();
  }
  return (
    <>
      <AssignStaffForm des={des} setDes={setDes} onAssignChange={handleAssignChange}/>
      <AssignStaffTable des={des} setDes={setDes} assignStaffs={assignStaffs}/>
    </>
  );
}

export default AssignStaff;
