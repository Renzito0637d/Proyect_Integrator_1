package com.ucv.Controller;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.net.HttpHeaders;
import com.ucv.Docs.IncidentExcel;
import com.ucv.Docs.IncidentPDF;
import com.ucv.Entity.Incident;
import com.ucv.Services.IncidentService;

@RestController
@RequestMapping("api/ucv")
public class IncidentController {
    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    @Autowired
    private IncidentService incidentService;

    // Obtener todas las incidencias
    @GetMapping("getAllIncidents")
    public ResponseEntity<List<Incident>> getAllIncidents() {
        List<Incident> incidents = incidentService.getAll();
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(incidents);
    }

    // Obtener incidencia por ID
    @GetMapping("getIncidentById/{id}")
    public Incident getIncidentById(@PathVariable Long id) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return incidentService.getById(id);
    }

    // Obtener incidencias por ID de usuario
    @GetMapping("getIncidentsByUserId/{userId}")
    public List<Incident> getIncidentsByUserId(@PathVariable Long userId) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return incidentService.getByUserId(userId);
    }

    // Crear una nueva incidencia
    @PostMapping("createIncident")
    public void createIncident(@RequestBody Incident incident) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        incidentService.save(incident);
    }

    // Actualizar una incidencia
    @PutMapping("incidentUpdate/{id}")
    public ResponseEntity<Incident> updateIncident(@RequestBody Incident incident, @PathVariable Long id) {
        Incident actual = incidentService.getById(id);
        if (actual == null) {
            return ResponseEntity.notFound().build();
        }

        actual.setRegisteredUser(incident.getRegisteredUser());
        actual.setDescription(incident.getDescription());
        actual.setArea(incident.getArea());
        actual.setRegisteredDate(incident.getRegisteredDate());
        actual.setIncidenDate(incident.getIncidenDate());
        actual.setPrioritylevel(incident.getPrioritylevel());

        incidentService.update(actual);
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        return ResponseEntity.ok(actual);
    }

    // Eliminar una incidencia
    @DeleteMapping("incidentDelete/{id}")
    public void deleteIncident(@PathVariable Long id) {
        logger.info("******************************************");
        logger.info("Request accepted successfully.");
        logger.info("******************************************");
        incidentService.delete(id);
    }

    @PostMapping("/incidentExcel")
    public ResponseEntity<byte[]> downloadIncidentExcel() throws Exception {
        List<Incident> incidentList = incidentService.getAll();
        byte[] excelBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            IncidentExcel.writeIncidentToExcel(incidentList, out, logo);
            excelBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incidents.xlsx")
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }

    @PostMapping("/incidentPDF")
    public ResponseEntity<byte[]> downloadIncidentPDF() throws Exception {
        List<Incident> incidentList = incidentService.getAll();
        byte[] pdfBytes;
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                InputStream logo = new FileInputStream("src/main/java/com/ucv/assets/logoCom.jpg")) {
            IncidentPDF.writeIncidentToPDF(incidentList, out, logo);
            pdfBytes = out.toByteArray();
            logger.info("******************************************");
            logger.info("Request accepted successfully.");
            logger.info("******************************************");
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incidents.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
