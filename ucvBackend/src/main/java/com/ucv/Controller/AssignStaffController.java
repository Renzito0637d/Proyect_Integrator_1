package com.ucv.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.AssignStaff;
import com.ucv.Entity.User;
import com.ucv.Services.AssignStaffService;
import com.ucv.Services.StaffService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.ucv.Docs.AssignStaffExcel;
import com.ucv.Docs.AssignStaffPDF;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

@RestController
@RequestMapping("api/ucv")
public class AssignStaffController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    @Autowired
    private AssignStaffService assignStaffService;

    @Autowired
    private StaffService staffService;

    @GetMapping("assignStaffList")
    public ResponseEntity<List<AssignStaff>> assignStaffList() {
        List<AssignStaff> as = assignStaffService.getAll();
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(as);
    }

    @PostMapping("assignStaffSave")
    public void assignStaffSave(@RequestBody AssignStaff assignStaff) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        assignStaffService.save(assignStaff);
    }

    @PutMapping("assignStaffUpdate/{id}")
    public ResponseEntity<AssignStaff> assignStaffUpdate(@PathVariable Long id, @RequestBody AssignStaff assignStaff) {
        AssignStaff actual = assignStaffService.getById(id);
        if (actual == null) {
            return ResponseEntity.notFound().build();
        }

        // 🛠 Aquí rescatamos el User real desde la base de datos
        User fullUser = staffService.getById(assignStaff.getUser().getId());
        if (fullUser == null) {
            return ResponseEntity.badRequest().build(); // O manejar con throw
        }

        actual.setIncident(assignStaff.getIncident());
        actual.setUser(fullUser);
        actual.setDateSolution(assignStaff.getDateSolution());
        actual.setStatus(assignStaff.getStatus());
        actual.setDescription(assignStaff.getDescription());

        assignStaffService.save(actual);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(actual);
    }

    @DeleteMapping("assignStaddDelete/{id}")
    public void assignStaddDelete(@PathVariable Long id) {
        assignStaffService.delete(id);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
    }

    @PostMapping("/assignStaffExcel")
    public ResponseEntity<byte[]> downloadAssignStaffExcel() throws Exception {
        List<AssignStaff> assignStaffList = assignStaffService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            AssignStaffExcel.writeAssignStaffToExcel(assignStaffList, out, logo);
            excelBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=assignStaff.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PostMapping("/assignStaffPDF")
    public ResponseEntity<byte[]> downloadAssignStaffPDF() throws Exception {
        List<AssignStaff> assignStaffList = assignStaffService.getAll();
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            AssignStaffPDF.writeAssignStaffToPDF(assignStaffList, out, logo);
            pdfBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=assignStaff.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
