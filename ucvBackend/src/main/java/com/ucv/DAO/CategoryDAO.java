package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.Category;

public interface CategoryDAO {
    public List<Category> getAll();
    public Category getById(Long id);    
    public void save(Category category);
    public void delete(Long id);
    public void update(Category category);
}
