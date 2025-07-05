package com.ucv.Services;

import com.ucv.Entity.Incident;

import java.util.List;

public interface IncidentService {
    public List<Incident> getAll();
    public List<Incident> getByUserId(Long userId);
    public Incident getById(Long id);
    public void save(Incident employee);
    public void update(Incident employee);
    public void delete(Long id);
}
