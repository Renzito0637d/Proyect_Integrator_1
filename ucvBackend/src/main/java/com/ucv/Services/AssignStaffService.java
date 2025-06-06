package com.ucv.Services;

import com.ucv.Entity.AssignStaff;

import java.util.List;

public interface AssignStaffService {
    public List<AssignStaff> getAll();
    public AssignStaff get(Long id);
    public void save(AssignStaff employee);
    public void update(AssignStaff employee);
    public void delete(Long id);
}
