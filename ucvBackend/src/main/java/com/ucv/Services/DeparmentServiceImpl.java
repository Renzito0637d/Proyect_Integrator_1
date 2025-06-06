package com.ucv.Services;

import java.util.List;

import com.ucv.DAO.DeparmentDAO;
import com.ucv.Entity.Deparment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeparmentServiceImpl implements DeparmentService{

    @Autowired
    private DeparmentDAO deparmentDAO;
    @Override
    public List<Deparment> getAll() {
        return deparmentDAO.getAll();
    }

    @Override
    public Deparment getById(Long id) {
        return deparmentDAO.getById(id);
    }

    @Override
    public void save(Deparment employee) {
        deparmentDAO.save(employee);
    }

    @Override
    public void update(Deparment employee) {
        deparmentDAO.save(employee);
    }

    @Override
    public void delete(Long id) {
        deparmentDAO.delete(id);
    }
    
}
