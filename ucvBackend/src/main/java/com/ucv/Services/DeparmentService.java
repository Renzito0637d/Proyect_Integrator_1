package com.ucv.Services;

import java.util.List;

import com.ucv.Entity.Deparment;

public interface DeparmentService {
    public List<Deparment> getAll();
    public Deparment getById(Long id);
    public void save(Deparment employee);
    public void update(Deparment employee);
    public void delete(Long id);
}
