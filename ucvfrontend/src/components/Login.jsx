import React, { useState } from "react";
import './Login.css';
import logoUCV from 'ucvfrontend/src/assets/ucv.jpg';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica de autenticación, por ahora solo mostramos los valores
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-left">
  <img src={logoucv} alt="ucv" />
</div>

    <div className="login-container">
  <h2>Iniciar Sesión</h2>
  <form onSubmit={handleSubmit}>
    <label>Email:</label>
    <input type="email" ... />
    <label>Password:</label>
    <input type="password" ... />
    <button type="submit">Ingresar</button>
  </form>
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
  );
};

export default Login;
