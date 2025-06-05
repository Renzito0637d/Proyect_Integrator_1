package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.User;
import com.ucv.Repository.StaffRepository;

@Repository
public class StaffDAOImpl implements StaffDAO {

    @Autowired
    StaffRepository staffRepository;
    @Override
    public List<User> getAll() {
        // Utiliza el repositorio para obtener todos los usuarios de la base de datos.
        // El método findAll() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
        return staffRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        // Utiliza el repositorio para buscar un usuario por su ID.
        // El método findById() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
        return staffRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        // Utiliza el repositorio para eliminar un usuario por su ID.
        // El método deleteById() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
        User userObj= staffRepository.findById(id).get();
        staffRepository.delete(userObj);
    }

    @Override
    public void update(User user) {
        // Utiliza el repositorio para actualizar un usuario.
        // El método save() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
        staffRepository.save(user);        
    }
    
}
