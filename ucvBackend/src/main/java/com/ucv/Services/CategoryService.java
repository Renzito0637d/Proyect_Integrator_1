package com.ucv.Services;

import com.ucv.Entity.Category;

import java.util.List;

public interface CategoryService {
    public List<Category> getAll();
    public Category getById(Long id);
    public void save(Category employee);
    public void update(Category employee);
    public void delete(Long id);
}
