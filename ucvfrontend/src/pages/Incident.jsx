import React from 'react';
import IncidentForm from '../components/Incident/IncidentForm/IncidentForm.jsx';
import IncidentTable from '../components/Incident/IncidentTable/IncidentTable.jsx';

const Incident = () => {
  return(
    <>
      <IncidentForm />
      <IncidentTable/>
    </>
  );
};

export default Incident;
