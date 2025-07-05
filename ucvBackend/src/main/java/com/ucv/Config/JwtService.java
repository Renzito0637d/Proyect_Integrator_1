package com.ucv.Config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    // Esta clase es un servicio que se encarga de generar y validar tokens JWT (JSON Web Tokens).
    // Utiliza la biblioteca io.jsonwebtoken para manejar la creación y validación de los tokens.

    // La clave secreta utilizada para firmar los tokens. Debe ser mantenida en
    // secreto y no debe ser expuesta.
    private static final String SECRET_KEY = "2e48f8da20ccb954e501ae0c078a76e1b727cd7895f3f514d8da394105117578";

    // Método que genera un token JWT a partir de los detalles del usuario.
    public String generateToken(UserDetails userDetails) {
        // Si el usuario tiene nickname, lo agrega como claim extra
        Map<String, Object> extraClaims = new HashMap<>();
        try {
            // El UserDetails puede ser User, que tiene getNickname() y getRole()
            Object maybeUser = userDetails;
            String nickname = null;
            String role = null;
            Long userId = null;

            // Reflection para evitar cast directo
            try {
                nickname = (String) maybeUser.getClass().getMethod("getNickname").invoke(maybeUser);
            } catch (Exception ignored) {
            }
            try {
                Object roleObj = maybeUser.getClass().getMethod("getRole").invoke(maybeUser);
                if (roleObj != null) {
                    role = roleObj.toString();
                }
            } catch (Exception ignored) {
            }
            // Obtener ID
            try {
                Object idObj = maybeUser.getClass().getMethod("getId").invoke(maybeUser);
                if (idObj != null) {
                    userId = Long.parseLong(idObj.toString());
                }
            } catch (Exception ignored) {
            }
            if (nickname != null) {
                extraClaims.put("nickname", nickname);
            }
            if (role != null) {
                extraClaims.put("role", role);
            }
            if (userId != null)
                extraClaims.put("userId", userId);
        } catch (Exception ignored) {
        }
        return generateToken(extraClaims, userDetails);
    }

    // Método que genera un token JWT a partir de los detalles del usuario y otros
    // reclamos adicionales.
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24 * 60)) // 24 hours
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Método que verifica si un token JWT es válido.
    public String getUsername(String token) {
        return getClaim(token, Claims::getSubject);
    }

    // Método que obtiene un reclamo específico del token JWT.
    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Método que obtiene todos los reclamos del token JWT.
    private Claims getAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Método que obtiene la clave secreta utilizada para firmar los tokens JWT.
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Método que valida un token JWT comparando el nombre de usuario y verificando
    // si el token ha expirado.
    public boolean validateToken(String jwt, UserDetails userDetails) {
        final String username = getUsername(jwt);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
    }

    // Método que verifica si el token JWT ha expirado.
    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    // Método que obtiene la fecha de expiración del token JWT.
    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

}// Fin de la clase
