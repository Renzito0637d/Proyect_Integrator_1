package com.ucv.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.ucv.Docs.StaffExcel;
import com.ucv.Docs.StaffPDF;
import com.ucv.Entity.User;
import com.ucv.Services.StaffService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/ucv")
public class StaffController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    @Autowired
    private StaffService staffService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/staffList")
    public List<User> getStaffList() {
        // Solo usuarios activos
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return staffService.getAll();
    }

    @GetMapping("/staffRole")
    public ResponseEntity<List<User>> getStaffListAdmin() {
        List<User> admins = staffService.findByRole();
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/staffUpdate")
    public String getMethodName(@RequestParam String param) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return new String();
    }

    @PostMapping("/staffExcel")
    public ResponseEntity<byte[]> downloadStaffExcel() throws Exception {
        List<User> staffList = staffService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            StaffExcel.writeStaffToExcel(staffList, out, logo);
            excelBytes = out.toByteArray();
        }

        logger.info("******************************************");
        logger.info("Staff Excel file generated successfully.");
        logger.info("******************************************");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=staff.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/staffUpdate/{id}")
    public ResponseEntity<User> updateStaff(@PathVariable Long id, @RequestBody User user) {
        User actual = staffService.getById(id);
        if (actual == null) {
            return ResponseEntity.notFound().build();
        }
        // Actualiza los campos necesarios
        actual.setFirstname(user.getFirstname());
        actual.setLastname(user.getLastname());
        actual.setEmail(user.getEmail());
        actual.setPhone(user.getPhone());
        actual.setNickname(user.getNickname());
        actual.setCargo(user.getCargo());
        // Encripta la contraseña solo si fue enviada
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            actual.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        // ...otros campos...

        staffService.update(actual);
        logger.info("**************************");
        logger.info("Staff updated: " + actual);
        logger.info("**************************");
        return ResponseEntity.ok(actual);
    }

    @DeleteMapping("/staffDelete/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        User staff = staffService.getById(id);
        if (staff == null) {
            return ResponseEntity.notFound().build();
        }
        staffService.delete(id); // Ahora solo desactiva
        logger.info("**************************");
        logger.info("Staff deactivated: " + staff);
        logger.info("**************************");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/staffPDF")
    public ResponseEntity<byte[]> downloadStaffPDF() throws Exception {
        List<User> staffList = staffService.getAll();
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            StaffPDF.writeStaffToPDF(staffList, out, logo);
            pdfBytes = out.toByteArray();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=staff.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

}
