package com.ucv.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    // Esta clase es la configuración de seguridad de Spring Boot. Se encarga de definir las reglas de seguridad
    // para las rutas de la aplicación, así como la configuración del filtro JWT y el proveedor de autenticación.

    // Inyección de dependencias del filtro JWT y el proveedor de autenticación
    private final JwtFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;

    // Método que configura la cadena de filtros de seguridad
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .cors(cors -> cors.and()) // Cambia esto a .cors(cors -> cors.and())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(publicEndpoints()).permitAll()                
                .anyRequest().authenticated())
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    // Método que define los endpoints públicos que no requieren autenticación
    private RequestMatcher publicEndpoints() {
        return new OrRequestMatcher(
        new AntPathRequestMatcher("/api/ucv/authenticate"),
        new AntPathRequestMatcher("/api/ucv/register"),
        new AntPathRequestMatcher("/api/ucv/publictest")
    );            
    }
    
}