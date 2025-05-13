import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/login.css'; // Asegúrate de tener este archivo CSS
import ucvImage from "../assets/ucv.jpg";

// Componente de inicio de sesión
const Login = () => {
  // Estado para almacenar el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook para la navegación react-router-dom
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();

    // Crear un objeto con las credenciales
    const credentials = { email, password };

    // Realizar la solicitud POST a la API de autenticación
    try {
      const response = await axios.post(
        "http://localhost:8080/api/ucv/authenticate",
        credentials, // Axios convierte automáticamente el objeto a JSON
        {
          // Configuración de la solicitud
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Si la solicitud es exitosa
      localStorage.setItem("token", response.data.token); // Guarda el token JWT en localStorage
      // Alerta de éxito
      alert("Login exitoso");

      navigate("/dashboard");
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        alert("Error: Credenciales incorrectas");
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        // Algo más causó el error
        console.error("Error al configurar la solicitud:", error.message);
      }
    }
  };

  // Renderiza el componente de inicio de sesión
  return (
    <div className="main-container">

      <div className="login-left">
        <img src={ucvImage} alt="Imagen UCV" />
      </div>

      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Ingresar</button>

        </form>
      </div>
    </div>
  );
};

export default Login;

