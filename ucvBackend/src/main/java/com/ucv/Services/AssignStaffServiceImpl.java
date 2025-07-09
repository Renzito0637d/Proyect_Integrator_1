package com.ucv.Services;

import com.ucv.DAO.AssignStaffDAO;
import com.ucv.Entity.AssignStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignStaffServiceImpl implements AssignStaffService{

    @Autowired
    private AssignStaffDAO assignStaffDAO;
    @Override
    public List<AssignStaff> getAll() {
        return assignStaffDAO.getAll();
    }

    @Override
    public AssignStaff getById(Long id) {
        return assignStaffDAO.getById(id);
    }

    @Override
    public void save(AssignStaff assignStaff) {
        assignStaffDAO.save(assignStaff);
    }

    @Override
    public void update(AssignStaff assignStaff) {
        assignStaffDAO.save(assignStaff);
    }

    @Override
    public void delete(Long id) {
        assignStaffDAO.delete(id);
    }

}
