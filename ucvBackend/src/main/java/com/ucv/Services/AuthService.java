package com.ucv.Services;

import com.ucv.Controller.Model.AuthResponse;
import com.ucv.Controller.Model.AuthenticationRequest;
import com.ucv.Controller.Model.RegisterRequest;

// Esta es la interfaz que define los métodos que deben ser implementados por la clase de servicio de autenticación.
// El propósito de este servicio es manejar las operaciones de registro y autenticación de usuarios.
public interface AuthService {

    // Método que maneja el registro de un nuevo usuario.
    // Recibe un objeto RegisterRequest que contiene los datos del usuario a registrar.
    // Devuelve un objeto AuthResponse que contiene la información relacionada con la autenticación del nuevo usuario.
    AuthResponse register (RegisterRequest request);

    // Método que maneja la autenticación de un usuario existente.
    // Recibe un objeto AuthenticationRequest que contiene las credenciales del usuario (por ejemplo, correo electrónico y contraseña).
    // Devuelve un objeto AuthResponse que contiene la información de autenticación (como un token o detalles de la sesión).
    AuthResponse authenticate (AuthenticationRequest request);
    
}
