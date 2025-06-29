package com.ucv.Services;

import java.util.List;

import com.ucv.Entity.Deparment;

public interface DeparmentService {
    public List<Deparment> getAll();
    public Deparment getById(Long id);
    public void save(Deparment deparment);
    public void update(Deparment deparment);
    public void delete(Long id);
}
