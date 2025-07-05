package com.ucv.Services;

import com.ucv.DAO.IncidentDAO;
import com.ucv.Entity.Incident;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncidentServiceImpl implements IncidentService{

    @Autowired
    private IncidentDAO incidentDAO;
    @Override
    public List<Incident> getAll() {
        return incidentDAO.getAll();
    }

    @Override
    public List<Incident> getByUserId(Long userId) {
        return incidentDAO.getByUserId(userId);
    }

    @Override
    public Incident getById(Long id) {
        return incidentDAO.getById(id);
    }

    @Override
    public void save(Incident incident) {
        incidentDAO.save(incident);
    }

    @Override
    public void update(Incident incident) {
        incidentDAO.save(incident);
    }

    @Override
    public void delete(Long id) {
        incidentDAO.delete(id);
    }
}
