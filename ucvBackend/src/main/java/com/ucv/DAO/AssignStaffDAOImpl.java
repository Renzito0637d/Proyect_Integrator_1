package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.AssignStaff;
import com.ucv.Repository.AssignStaffRepository;

@Repository
public class AssignStaffDAOImpl implements AssignStaffDAO{

    @Autowired
    AssignStaffRepository assignStaffRepository;
    @Override
    public List<AssignStaff> getAll() {
        return assignStaffRepository.findAll();
    }

    @Override
    public AssignStaff getById(Long id) {
        return assignStaffRepository.findById(id).get();
    }

    @Override
    public void save(AssignStaff assignStaff) {
        assignStaffRepository.save(assignStaff);
    }

    @Override
    public void delete(Long id) {        
        AssignStaff assignStaffObj = assignStaffRepository.findById(id).get();
        assignStaffRepository.delete(assignStaffObj);
    }

    @Override
    public void update(AssignStaff assignStaff) {
        assignStaffRepository.save(assignStaff);
    }
    
}
