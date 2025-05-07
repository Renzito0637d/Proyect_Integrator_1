package com.ucv.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.User;

// Esta interfaz define un repositorio para la entidad User.
// Extiende JpaRepository, lo que permite usar las funcionalidades de JPA (Java Persistence API) 
// para acceder y manipular los datos de la entidad User en la base de datos.
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    // Método personalizado que busca un usuario en la base de datos por su correo electrónico.
    // Devuelve un Optional<User> para manejar el caso en el que no se encuentre un usuario con ese correo.
    Optional<User> findUserByEmail(String email);
}
