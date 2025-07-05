package com.ucv.Services;

import java.util.List;

import com.ucv.Entity.User;

public interface StaffService {
    public List<User> getAll();

    public User getById(Long id);

    public void delete(Long id);

    public void update(User user);

}