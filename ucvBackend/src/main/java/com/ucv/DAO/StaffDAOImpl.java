package com.ucv.DAO;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Role;
import com.ucv.Entity.User;
import com.ucv.Repository.StaffRepository;

@Repository
public class StaffDAOImpl implements StaffDAO {

    @Autowired
    StaffRepository staffRepository;
    @Override
    public List<User> getAll() {
        // Solo usuarios activos
        return staffRepository.findByActiveTrue();
    }

    @Override
    public User getById(Long id) {
        // Utiliza el repositorio para buscar un usuario por su ID.
        // El método findById() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
        return staffRepository.findById(id).get();
    }

    @Override
    public List<User>findByRole(){
        return staffRepository.findByRole(Role.ADMIN);
    }

    @Override
    public void delete(Long id) {
        // Desactiva el usuario en vez de eliminarlo
        User userObj = staffRepository.findById(id).get();
        userObj.setActive(false);
        staffRepository.save(userObj);
    }

    @Override
    public void update(User user) {
        // Utiliza el repositorio para actualizar un usuario.
        // El método save() es proporcionado por JpaRepository, que es una interfaz extendida por StaffRepository.
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
        staffRepository.save(user);        
    }
    
}

