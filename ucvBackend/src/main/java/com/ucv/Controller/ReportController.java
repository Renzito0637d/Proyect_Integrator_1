package com.ucv.Controller;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import com.ucv.Entity.User;
import com.ucv.Services.StaffService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.net.HttpHeaders;
import com.ucv.Docs.ReportExcel;
import com.ucv.Docs.ReportPDF;
import com.ucv.Entity.Report;
import com.ucv.Services.ReportService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/ucv")
public class ReportController {

    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);

    @Autowired
    private ReportService reportService;

    @Autowired
    private StaffService staffService;

    @GetMapping("/getAllReport")
    public ResponseEntity<List<Report>> getAllReport() {
        List<Report> re = reportService.getAll();
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(re);
    }

    @PostMapping("/saveReport")
    public ResponseEntity<Report> saveReport(@RequestBody Report report) {
        reportService.save(report);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(report);
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<Report> putMethodName(@PathVariable Long id, @RequestBody Report report) {
        Report actu = reportService.getById(id);

        if (actu == null) {
            return ResponseEntity.notFound().build();
        }
        User fullUser = staffService.getById(report.getUser().getId());
        if (fullUser == null) {
            return ResponseEntity.badRequest().build(); // O manejar con throw
        }

        actu.setAssignStaff(report.getAssignStaff());
        actu.setActions(report.getActions());
        actu.setStatus(report.getStatus());
        actu.setResolutionDate(report.getResolutionDate());
        actu.setUser(fullUser);
        actu.setDescripcion(report.getDescripcion());

        reportService.save(actu);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(actu);
    }

    @DeleteMapping("/deleteReport/{id}")
    public void delete(@PathVariable Long id) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        reportService.delete(id);
    }

    @PostMapping("/reportExcel")
    public ResponseEntity<byte[]> downloadReportExcel() throws Exception {
        List<Report> reportList = reportService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            ReportExcel.writeReportToExcel(reportList, out, logo);
            excelBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reports.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PostMapping("/reportPDF")
    public ResponseEntity<byte[]> downloadReportPDF() throws Exception {
        List<Report> reportList = reportService.getAll(); // Asegúrate que este método exista
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            ReportPDF.writeReportToPDF(reportList, out, logo);
            pdfBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reports.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

}
