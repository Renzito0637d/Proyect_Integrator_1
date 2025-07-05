package com.ucv.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.Incident;
import com.ucv.Services.IncidentService;

@RestController
@RequestMapping("api/ucv")
public class IncidentController {
     @Autowired
    private IncidentService incidentService;

    // Obtener todas las incidencias
    @GetMapping("getAllIncidents")
    public List<Incident> getAllIncidents() {
        return incidentService.getAll();
    }

    // Obtener incidencia por ID
    @GetMapping("getIncidentById/{id}")
    public Incident getIncidentById(@PathVariable Long id) {
        return incidentService.getById(id);
    }

    // Obtener incidencias por ID de usuario
    @GetMapping("getIncidentsByUserId/{userId}")
    public List<Incident> getIncidentsByUserId(@PathVariable Long userId) {
        return incidentService.getByUserId(userId);
    }

    // Crear una nueva incidencia
    @PostMapping("createIncident")
    public void createIncident(@RequestBody Incident incident) {
        incidentService.save(incident);
    }

    // Actualizar una incidencia
    @PutMapping
    public void updateIncident(@RequestBody Incident incident) {
        incidentService.update(incident);
    }

    // Eliminar una incidencia
    @DeleteMapping("/{id}")
    public void deleteIncident(@PathVariable Long id) {
        incidentService.delete(id);
    }
}
