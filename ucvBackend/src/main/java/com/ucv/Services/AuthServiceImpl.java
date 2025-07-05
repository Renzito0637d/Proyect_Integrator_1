package com.ucv.Services;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ucv.Config.JwtService;
import com.ucv.Controller.Model.AuthResponse;
import com.ucv.Controller.Model.AuthenticationRequest;
import com.ucv.Controller.Model.RegisterRequest;
import com.ucv.Entity.Role;
import com.ucv.Entity.User;
import com.ucv.Repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.RequiredArgsConstructor;

// Esta clase implementa la interfaz AuthService y proporciona la lógica de negocio 
// para el registro y la autenticación de usuarios, incluyendo la generación de tokens JWT
// para la autenticación basada en tokens.
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
    // Inyecciones de dependencias
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Método para registrar un nuevo usuario
    @Override
    public AuthResponse register(RegisterRequest request) {
        // Determinar el rol según el cargo
        Role assignedRole = Role.USER;
        if (request.getCargo() != null && !"Estudiante".equalsIgnoreCase(request.getCargo().trim())) {
            assignedRole = Role.ADMIN;
        }
        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .phone(request.getPhone())
                .nickname(request.getNickname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(assignedRole)
                .cargo(request.getCargo())
                .active(true)
                .build();

        if(user.getFirstname() != null){
            user.setFirstname(StringUtils.normalizeSpace(user.getFirstname()));
        }
        if(user.getLastname() != null){
            user.setLastname(StringUtils.normalizeSpace(user.getLastname()));
        }
        if(user.getNickname() != null){
            user.setNickname(StringUtils.replace(user.getNickname(), " ", ""));
        }
        if(user.getEmail() != null){
            user.setEmail(StringUtils.normalizeSpace(user.getEmail()));
        }
        if(user.getPhone() != null){
            user.setPhone(StringUtils.normalizeSpace(user.getPhone()));
        }
        // Verificar si el usuario ya existe en la base de datos
        if (userRepository.findUserByEmail(request.getEmail()).isPresent()) {
            throw new IllegalStateException("El usuario ya existe");
        }
        // Guardar el nuevo usuario en la base de datos
        userRepository.save(user);
        logger.info("Usuario registrado exitoxamente: ", user.getEmail());
        // Generar un token JWT para el usuario registrado
        var jwtToken = jwtService.generateToken(user);
        // Devolver el token generado dentro de un objeto AuthResponse
        return AuthResponse.builder().token(jwtToken).build();
    }

    // Método para autenticar a un usuario con sus credenciales
    @Override
    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Buscar al usuario en la base de datos utilizando el correo electrónico proporcionado
        var user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        // Generar un token JWT para el usuario autenticado
        var jwtToken = jwtService.generateToken(user);
        logger.info("Usuario autenticado exitosamente: ", user.getEmail());
        logger.info("Token JWT generado para el usuario autenticado: "+jwtToken);
        // Devolver el token generado dentro de un objeto AuthResponse
        return AuthResponse.builder().token(jwtToken).build();
    }
    
}
