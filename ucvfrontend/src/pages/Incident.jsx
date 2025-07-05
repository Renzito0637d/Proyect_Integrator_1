import React, { useState, useEffect } from 'react';
import IncidentForm from '../components/Incident/IncidentForm/IncidentForm.jsx';
import IncidentTable from '../components/Incident/IncidentTable/IncidentTable.jsx';
import axios from 'axios';
import { getAuthHeader } from '../Utils/Auth.jsx';

const Incident = () => {
  const [incidentList, setIncidentList] = useState([]);

  const fetchIncidentListForId = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token de sesión.");
      return;
    }

    // Decodificar el token manualmente
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;
    try {

      const respone = await axios.get(`http://localhost:8080/api/ucv/getIncidentsByUserId/${userId}`, {
        headers: getAuthHeader(),
      });
      setIncidentList(respone.data);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchIncidentListForId();
  }, []);

  const handleIncidentChanged = () => {
    fetchIncidentListForId();
  };

  return (
    <>
      <IncidentForm onIncidentChange={handleIncidentChanged}/>
      <IncidentTable incidentList={incidentList}/>
    </>
  );
};

export default Incident;
