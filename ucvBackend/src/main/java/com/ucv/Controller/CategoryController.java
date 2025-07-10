package com.ucv.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.ucv.Docs.CategoryExcel;
import com.ucv.Docs.CategoryPDF;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

@RestController
@RequestMapping("/api/ucv")
public class CategoryController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categoryList")
    public List<Category> list() {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return categoryService.getAll();
    }

    @PostMapping("/categorySave")
    public ResponseEntity<Category> save(@RequestBody Category category) {
        categoryService.save(category);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
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
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(existing);
    }

    @DeleteMapping("/categoryDelete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Category existing = categoryService.getById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        categoryService.delete(id);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/categoryExcel")
    public ResponseEntity<byte[]> downloadCategoryExcel() throws Exception {
        List<Category> categoryList = categoryService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            CategoryExcel.writeCategoryToExcel(categoryList, out, logo);
            excelBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=categories.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PostMapping("/categoryPDF")
    public ResponseEntity<byte[]> downloadCategoryPDF() throws Exception {
        List<Category> categoryList = categoryService.getAll();
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            CategoryPDF.writeCategoryToPDF(categoryList, out, logo);
            pdfBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=categories.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
