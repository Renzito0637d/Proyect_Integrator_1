package com.ucv.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Controller.Model.AuthResponse;
import com.ucv.Controller.Model.AuthenticationRequest;
import com.ucv.Controller.Model.RegisterRequest;
import com.ucv.Services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ucv")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    // Inyeccion de la clase AuthService
    @Autowired
    private AuthService authService;

    // Método que maneja la solicitud HTTP POST para el registro de un nuevo usuario.
    // Recibe los datos de registro a través del cuerpo de la solicitud (RegisterRequest) 
    // y devuelve una respuesta con un objeto AuthResponse que contiene la información de autenticación.
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(authService.register(request));
    }

    // Método que maneja la solicitud HTTP POST para autenticar a un usuario.
    // Recibe las credenciales de autenticación a través del cuerpo de la solicitud (AuthenticationRequest) 
    // y devuelve una respuesta con un objeto AuthResponse que contiene el token o la información de la sesión.
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse>  authenticate(@RequestBody AuthenticationRequest request) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(authService.authenticate(request));
    }

    // Método que maneja una solicitud HTTP GET para realizar una prueba pública.
    // No requiere ningún parámetro y simplemente devuelve un mensaje de texto indicando que es una prueba pública.
    @GetMapping("/publictest")
    public String publicTest() {
        return "Public Test";
    }
    
}
