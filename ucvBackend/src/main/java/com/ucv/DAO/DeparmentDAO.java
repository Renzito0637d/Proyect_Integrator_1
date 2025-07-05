package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.Deparment;

public interface DeparmentDAO {
    public List<Deparment> getAll();
    public Deparment getById(Long id);    
    public void save(Deparment deparment);
    public void delete(Long id);
    public void update(Deparment deparment);
}
