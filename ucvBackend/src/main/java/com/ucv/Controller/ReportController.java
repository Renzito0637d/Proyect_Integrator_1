package com.ucv.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @Autowired
    private ReportService reportService;

    @GetMapping("/getAllReport")
    public List<Report> getAllReport() {
        return reportService.getAll();
    }

    @PostMapping("/saveReport")
    public ResponseEntity<Report> saveReport(@RequestBody Report report) {
        reportService.save(report);
        System.out.println("Usuario recibido: " + report.getUser());
System.out.println("ID del usuario recibido: " + report.getUser().getId());

        return ResponseEntity.ok(report);
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<Report> putMethodName(@PathVariable Long id, @RequestBody Report report) {
        Report actu = reportService.getById(id);

        if (actu == null) {
            return ResponseEntity.notFound().build();
        }

        actu.setAssignStaff(report.getAssignStaff());
        actu.setActions(report.getActions());
        actu.setStatus(report.getStatus());
        actu.setResolutionDate(report.getResolutionDate());
        actu.setUser(report.getUser());
        actu.setDescripcion(report.getDescripcion());

        reportService.save(actu);
        return ResponseEntity.ok(actu);
    }

    @DeleteMapping("/deleteReport/{id}")
    public void delete(@PathVariable Long id) {
        reportService.delete(id);
    }
}
