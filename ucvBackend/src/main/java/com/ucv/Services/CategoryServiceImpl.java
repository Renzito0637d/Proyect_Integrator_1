package com.ucv.Services;

import com.ucv.DAO.CategoryDAO;
import com.ucv.Entity.Category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDAO categoryDAO;
    @Override
    public List<Category> getAll() {
        return categoryDAO.getAll();
    }

    @Override
    public Category getById(Long id) {
        return categoryDAO.getById(id);
    }

    @Override
    public void save(Category category) {
        categoryDAO.save(category);
    }

    @Override
    public void update(Category category) {
        categoryDAO.save(category);
    }

    @Override
    public void delete(Long id) {
        categoryDAO.delete(id);
    }
}
