package com.ucv.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.Deparment;
import com.ucv.Services.DeparmentService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.ucv.Docs.DeparmentExcel;
import com.ucv.Docs.DeparmentPDF;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;

@RestController
@RequestMapping("api/ucv")
public class DeparmentController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    @Autowired
    private DeparmentService deparmentService;

    @GetMapping("deparmentList")
    public List<Deparment> getStaffList() {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return deparmentService.getAll();
    }

    @PostMapping("deparmentSave")
    public ResponseEntity<Deparment> deparmentSave(@RequestBody Deparment deparment) {
        deparmentService.save(deparment);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(deparment);
    }

    @PutMapping("/deparmentUpdate/{id}")
    public ResponseEntity<Deparment> updateStaff(@PathVariable Long id, @RequestBody Deparment deparment) {
        Deparment actual = deparmentService.getById(id);
        if (actual == null) {
            return ResponseEntity.notFound().build();
        }
        // Actualiza los campos necesarios
        actual.setRegisteredUser(deparment.getRegisteredUser());
        actual.setName(deparment.getName());
        actual.setTower(deparment.getTower());
        actual.setFloor(deparment.getFloor());
        actual.setClassroom(deparment.getClassroom());
        actual.setRegisteredDate(deparment.getRegisteredDate());
        actual.setCode(deparment.getCode());

        deparmentService.update(actual);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(actual);
    }

    @DeleteMapping("/deparmentDelate/{id}")
    public ResponseEntity<Void> deleteDeparment(@PathVariable Long id) {
        Deparment deparment = deparmentService.getById(id);
        if (deparment == null) {
            return ResponseEntity.notFound().build();
        }
        deparmentService.delete(id);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/deparmentExcel")
    public ResponseEntity<byte[]> downloadDeparmentExcel() throws Exception {
        List<Deparment> deparmentList = deparmentService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            DeparmentExcel.writeDeparmentToExcel(deparmentList, out, logo);
            excelBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=deparments.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PostMapping("/deparmentPDF")
    public ResponseEntity<byte[]> downloadDeparmentPDF() throws Exception {
        List<Deparment> deparmentList = deparmentService.getAll();
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            DeparmentPDF.writeDeparmentToPDF(deparmentList, out, logo);
            pdfBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=deparments.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
