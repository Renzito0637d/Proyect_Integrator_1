import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css';
import ucvImage from "../../assets/ucv.jpg";
import logoCom from "../../assets/logoCom.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from 'sonner'

// Componente de inicio de sesión
const Login = () => {
  // Estado para almacenar el correo electrónico y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controla visibilidad
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
      sessionStorage.setItem("token", response.data.token); // Guarda el token JWT en localStorage
      // Alerta de éxito
      navigate("/dashboard");
      return toast.success("Inicio de sesión exitoso", {
        duration: 3000,
      });
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

  return (
    <div className="container-fluid login-wrapper">
      
      <div className="row h-100">
        <div className="d-none d-md-block col-md-6 p-0">
          <img
            src={ucvImage}
            alt="Imagen UCV"
            className="img-fluid h-100 w-100 object-fit-cover masked-image"
          />
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-5 bg-white">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="col-12 cent">
              <img
                src={logoCom}
                alt="Imagen UCV"
                className="img-fluid h-100 w-100 object-fit-cover"
              />
            </div>
            <p className="text-muted text-center mb-4">Bienvenido de nuevo</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <div className="position-relative">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex align-items-start mt-1 text-muted" style={{ fontSize: '0.9rem' }}>
                  <i className="bi bi-info-circle me-2 text-primary" style={{ fontSize: '1.2rem' }}></i>
                  <span className="mt-1">Ejemplo de correo: juan@ucv.edu.pe</span>
                </div>
              </div>


              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control pe-5" // Espacio a la derecha para el ícono
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '15px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#6c757d'
                    }}
                  />
                </div>
              </div>


              <div className="mb-3 text-end">
                <span
                  className="text-decoration-none text-primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/forgot-password')}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
