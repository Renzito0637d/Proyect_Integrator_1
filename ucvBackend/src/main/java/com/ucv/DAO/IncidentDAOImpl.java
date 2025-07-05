package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Incident;
import com.ucv.Entity.User;
import com.ucv.Repository.IncidentRepository;
import com.ucv.Repository.StaffRepository;

@Repository
public class IncidentDAOImpl implements IncidentDAO{

    @Autowired
    IncidentRepository incidentRepository;

    @Autowired
    StaffRepository staffRepository;

    @Override
    public List<Incident> getAll() {
        return incidentRepository.findAll();
    }

    @Override
    public Incident getById(Long id) {
        return incidentRepository.findById(id).get();
    }

    @Override
    public List<Incident> getByUserId(Long userId) {        
        User user = staffRepository.findById(userId).orElse(null);
        if (user == null) {
            return List.of(); // o puedes lanzar una excepción si prefieres
        }
        return incidentRepository.findByUser(user);
    }

    @Override
    public void save(Incident incident) {
        incidentRepository.save(incident);
    }

    @Override
    public void delete(Long id) {
        Incident incidentObj = incidentRepository.findById(id).get();
        incidentRepository.delete(incidentObj);
    }

    @Override
    public void update(Incident incident) {
        incidentRepository.save(incident);
    }
    
}
