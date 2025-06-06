package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Incident;
import com.ucv.Repository.IncidentRepository;

@Repository
public class IncidentDAOImpl implements IncidentDAO{

    @Autowired
    IncidentRepository incidentRepository;
    @Override
    public List<Incident> getAll() {
        return incidentRepository.findAll();
    }

    @Override
    public Incident getById(Long id) {
        return incidentRepository.findById(id).get();
    }

    @Override
    public void save(Incident deparment) {
        incidentRepository.save(deparment);
    }

    @Override
    public void delete(Long id) {
        Incident incidentObj = incidentRepository.findById(id).get();
        incidentRepository.delete(incidentObj);
    }

    @Override
    public void update(Incident deparment) {
        incidentRepository.save(deparment);
    }
    
}
