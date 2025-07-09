import React, { useEffect, useState } from 'react';
import ReportFrom from '../components/Report/ReportForm/ReportFrom';
import ReportTable from '../components/Report/ReportTable/ReportTable';
import axios from 'axios';
import { getAuthHeader } from '../Utils/Auth';
const Report = () => {
  const [reports, setReports] = useState([]);

  const fecthReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/ucv/getAllReport`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
      });
      console.log("Datos recibidos:", response.data);  // Agregar este log
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fecthReport();
  }, []);

  const handleReportChange = () => {
    fecthReport();
  }
  return (
    <>
      <ReportFrom onReportChange={handleReportChange} />
      <ReportTable reports={reports} />
    </>
  );
};

export default Report;
