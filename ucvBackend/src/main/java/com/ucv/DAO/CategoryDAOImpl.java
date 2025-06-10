package com.ucv.DAO;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Category;
import com.ucv.Repository.CategoryRepository;

@Repository
public class CategoryDAOImpl implements CategoryDAO{

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public void save(Category category) {
        if(category.getDescription() != null) {
            category.setDescription(StringUtils.normalizeSpace(category.getDescription()));
        }
        categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        Category categoryObj = categoryRepository.findById(id).get();
        categoryRepository.delete(categoryObj);
    }

    @Override
    public void update(Category category) {
        categoryRepository.save(category);
    }
    
    
}
