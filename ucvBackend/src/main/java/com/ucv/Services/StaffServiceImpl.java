package com.ucv.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucv.DAO.StaffDAO;
import com.ucv.Entity.User;

import jakarta.transaction.Transactional;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffDAO staffDAO;

    @Transactional
    @Override
    public List<User> getAll() {
        return staffDAO.getAll();
    }

    @Transactional
    @Override
    public User getById(Long id) {
        return staffDAO.getById(id);
    }

    @Transactional
    @Override
    public List<User> findByRole(){
        return staffDAO.findByRole();
    }

    @Transactional
    @Override
    public void delete(Long id) {
        staffDAO.delete(id);
    }

    @Transactional
    @Override
    public void update(User user) {
        staffDAO.update(user);
    }

}
