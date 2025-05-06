import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import ucvImage from "../assets/ucv.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

   
    if (email === "admin@ucv.edu.pe" && password === "1234") {
      navigate("/dashboard"); 
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

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

