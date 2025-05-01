import React, { useState } from "react";

const Login = () => {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email"required/>
      </div>
      
      <div>
        <label>Password:</label>
        <input type="password" required/>                            
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
