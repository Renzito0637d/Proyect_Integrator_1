package com.ucv.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.Category;
import com.ucv.Services.CategoryService;

@RestController
@RequestMapping("/api/ucv")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categoryList")
    public List<Category> list() {
        return categoryService.getAll();
    }

    @PostMapping("/categorySave")
    public ResponseEntity<Category> save(@RequestBody Category category) {
        categoryService.save(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/categoryUpdate/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id, @RequestBody Category category) {
        Category existing = categoryService.getById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        existing.setType(category.getType());
        existing.setPrioritylevel(category.getPrioritylevel());
        existing.setCategory(category.getCategory());
        existing.setDescription(category.getDescription());
        existing.setRegisteredDate(LocalDateTime.now());
        categoryService.update(existing);
        return ResponseEntity.ok(existing);
    }

    @DeleteMapping("/categoryDelete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Category existing = categoryService.getById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

