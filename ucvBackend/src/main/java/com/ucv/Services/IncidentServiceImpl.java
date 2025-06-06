package com.ucv.Services;

import com.ucv.DAO.IncidentDAO;
import com.ucv.Entity.Incident;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class IncidentServiceImpl implements IncidentService{

    @Autowired
    private IncidentDAO incidentDAO;
    @Override
    public List<Incident> getAll() {
        return incidentDAO.getAll();
    }

    @Override
    public Incident getById(Long id) {
        return incidentDAO.getById(id);
    }

    @Override
    public void save(Incident employee) {
        incidentDAO.save(employee);
    }

    @Override
    public void update(Incident employee) {
        incidentDAO.save(employee);
    }

    @Override
    public void delete(Long id) {
        incidentDAO.delete(id);
    }
}
