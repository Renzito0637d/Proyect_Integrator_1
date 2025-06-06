import React from 'react';
import AssignStaffForm from '../components/AssignStaff/AssignStaffForm/AssignStaffForm';
import AssignStaffTable from '../components/AssignStaff/AssignStaffTable/AssignStaffTable';

function AssignStaff() {
  return (
    <div className="container mt-4">
      <AssignStaffForm />
      <AssignStaffTable />
    </div>
  );
}

export default AssignStaff;
