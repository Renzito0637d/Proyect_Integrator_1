// src/components/Registro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ucvImage from "../assets/ucv.jpg"; // asegúrate que exista esta imagen
import "../styles/Registro.css";

const Registro = () => {
  const navigate = useNavigate();

  return (
    <div className="registro-container">
      <img src={ucvImage} alt="UCV Logo" className="registro-logo" />
      <form className="registro-form">
        <label>Nombres:</label>
        <input type="text" placeholder="Ingresa tus nombres" />

        <label>Apellidos:</label>
        <input type="text" placeholder="Ingresa tus apellidos" />

        <label>Usuario:</label>
        <input type="text" placeholder="Correo electrónico" />

        <label>Contraseña:</label>
        <input type="password" placeholder="Crea una contraseña" />

        <div className="registro-buttons">
          <button type="submit">Registrar</button>
          <button type="button" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
