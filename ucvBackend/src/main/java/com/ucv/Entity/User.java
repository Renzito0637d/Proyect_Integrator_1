package com.ucv.Entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Esta clase representa la entidad de usuario en la base de datos y se utiliza para almacenar
// la información de los usuarios que se registran en la aplicación. La clase implementa la interfaz UserDetails
@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails{

    // Este campo es la clave primaria de la tabla y se generará automáticamente
    // con una estrategia de identidad (IDENTITY) en la base de datos.

    // Atributos de la clase
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String nickname;
    private String password;

    // Este campo representa el rol del usuario en la aplicación.
    // Se utiliza un enumerador (enum) para definir los diferentes roles disponibles.
    @Enumerated(EnumType.STRING)
    private Role role;
    
    private String cargo;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Incident> incident;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<AssignStaff> assignStaff;

    // Este campo indica si el usuario ha confirmado su cuenta o no.
    private Boolean active = true; // El nombre correcto es "active"

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) {
            return List.of();
        }
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    // Este método devuelve el nombre de usuario del usuario.
    @Override
    public String getUsername() {
        return this.email;
    }

    // Este método devuelve la contraseña del usuario.
    @Override
    public String getPassword() {        
        return this.password;
    }

    // Los siguientes métodos devuelven valores predeterminados para las propiedades de seguridad del usuario.
    @Override
    public boolean isAccountNonExpired() {        
        return true;
    }

    // Este método indica si la cuenta del usuario está bloqueada o no.
    @Override
    public boolean isAccountNonLocked() {        
        return true;
    }

    // Este método indica si las credenciales del usuario han expirado o no.
    @Override
    public boolean isCredentialsNonExpired() {        
        return true;
    }

    // Este método indica si la cuenta del usuario está habilitada o no.
    @Override
    public boolean isEnabled() {    
        return Boolean.TRUE.equals(this.active);
    }
    
}// Fin de la clase
