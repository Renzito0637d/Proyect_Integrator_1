package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.Incident;

public interface IncidentDAO {
    public List<Incident> getAll();
    public Incident getById(Long id);    
    public void save(Incident deparment);
    public void delete(Long id);
    public void update(Incident deparment);
}
