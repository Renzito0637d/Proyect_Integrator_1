package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.AssignStaff;

public interface AssignStaffDAO {
    public List<AssignStaff> getAll();
    public AssignStaff getById(Long id);    
    public void save(AssignStaff assignStaff);
    public void delete(Long id);
    public void update(AssignStaff assignStaff);
}
