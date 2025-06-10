import React from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <>
      <div className="forgot-password-bg">
        <div className="forgot-password-overlay"></div>
        <div className="forgot-password-content d-flex justify-content-center align-items-center">
          <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h4 className="mb-3 text-center">Recuperar contraseña</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  disabled={false}
                />
              </div>
              <button type="button" className="btn btn-primary w-100 mb-3">
                Enviar código
              </button>
              <div className="mb-3">
                <label className="form-label">Código recibido por SMS</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa el código"
                  disabled={false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
