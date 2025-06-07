import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaTags,
  FaFileAlt,
  FaBuilding,
  FaUsers,
  FaUserPlus,
} from 'react-icons/fa';
import IncidentForm  from '../components/Incident/IncidentForm/IncidentForm';
import IncidentTable from '../components/Incident/IncidentTable/IncidentTable';

export default function Incidencias() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{
          width: 90, background: '#343a40', display: 'flex', flexDirection: 'column',
          alignItems: 'center', paddingTop: 20, position: 'fixed', top: 0, left: 0
        }}>
        <Link to="/dashboard"       style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaTachometerAlt size={22}/><div style={{fontSize:10}}>Dashboard</div></Link>
        <Link to="/incidencias"     style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaClipboardList size={22}/><div style={{fontSize:10}}>Incidencias</div></Link>
        <Link to="/categoria"       style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaTags size={22}/><div style={{fontSize:10}}>Categoría</div></Link>
        <Link to="/informe"         style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaFileAlt size={22}/><div style={{fontSize:10}}>Informe</div></Link>
        <Link to="/departamento"    style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaBuilding size={22}/><div style={{fontSize:10}}>Departamento</div></Link>
        <Link to="/personal"        style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaUsers size={22}/><div style={{fontSize:10}}>Personal</div></Link>
        <Link to="/asignar-personal"style={{ color:'white', margin:'15px 0', textAlign:'center' }}><FaUserPlus size={22}/><div style={{fontSize:10}}>Asignar</div></Link>
      </div>
      <div style={{ marginLeft: 90, padding: 20, width: `calc(100% - 90px)` }}>
        <IncidentForm />
        <IncidentTable />
      </div>
    </div>
  );
}
