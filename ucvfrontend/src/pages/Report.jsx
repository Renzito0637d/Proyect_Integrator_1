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
import StaffForm from '../components/Staff/StaffForm/StaffForm';
import StaffTable from '../components/Staff/StaffTable/StaffTable';

export default function Staff() {
  // Definimos aquí los estilos inline
  const styles = {
    mainLayout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    sidebar: {
      width: 90,
      backgroundColor: '#343a40',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 20,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
    },
    sidebarItem: {
      color: 'white',
      textDecoration: 'none',
      textAlign: 'center',
      margin: '15px 0',
      width: '100%',
      transition: 'background-color 0.2s',
    },
    icon: {
      fontSize: 22,
      marginBottom: 5,
    },
    label: {
      fontSize: 10,
      display: 'block',
    },
    contentArea: {
      marginLeft: 90,
      padding: 20,
      width: `calc(100% - 90px)`,
    },
    hover: {
      backgroundColor: '#495057',
      borderRadius: 10,
      padding: '8px 0',
    },
  };

  // Función auxiliar para aplicar hover (opcional)
  const makeSidebarItem = (to, Icon, text) => (
    <Link
      to={to}
      style={styles.sidebarItem}
      onMouseEnter={e => Object.assign(e.currentTarget.style, styles.hover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, styles.sidebarItem)}
    >
      <Icon style={styles.icon} />
      <span style={styles.label}>{text}</span>
    </Link>
  );

  return (
    <div style={styles.mainLayout}>
      <div style={styles.sidebar}>
        {makeSidebarItem('/dashboard', FaTachometerAlt, 'Dashboard')}
        {makeSidebarItem('/incidencias', FaClipboardList, 'Incidencias')}
        {makeSidebarItem('/categoria', FaTags, 'Categoría')}
        {makeSidebarItem('/informe', FaFileAlt, 'Informe')}
        {makeSidebarItem('/departamento', FaBuilding, 'Departamento')}
        {makeSidebarItem('/personal', FaUsers, 'Personal')}
        {makeSidebarItem('/asignar-personal', FaUserPlus, 'Asignar')}
      </div>

      <div style={styles.contentArea}>
        <StaffForm />
        <StaffTable />
      </div>
    </div>
  );
}

