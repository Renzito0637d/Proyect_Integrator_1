package com.ucv.Services;

import com.ucv.Entity.AssignStaff;

import java.util.List;

public interface AssignStaffService {
    public List<AssignStaff> getAll();
    public AssignStaff getById(Long id);
    public void save(AssignStaff assignStaff);
    public void update(AssignStaff assignStaff);
    public void delete(Long id);
}
