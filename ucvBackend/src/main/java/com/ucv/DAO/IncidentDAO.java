package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.Incident;

public interface IncidentDAO {
    public List<Incident> getAll();
    public List<Incident> getByUserId(Long userId);
    public Incident getById(Long id);    
    public void save(Incident incident);
    public void delete(Long id);
    public void update(Incident incident);
}
