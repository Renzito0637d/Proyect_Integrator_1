package com.ucv.Controller;

import java.util.List;

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

@RestController
@RequestMapping("api/ucv")
public class AssignStaffController {

    @Autowired
    private AssignStaffService assignStaffService;

    @Autowired
    private StaffService staffService;

    @GetMapping("assignStaffList")
    public List<AssignStaff> assignStaffList() {
        return assignStaffService.getAll();
    }

    @PostMapping("assignStaffSave")
    public void assignStaffSave(@RequestBody AssignStaff assignStaff) {
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
        
        return ResponseEntity.ok(actual);
    }

    @DeleteMapping("assignStaddDelete/{id}")
    public void assignStaddDelete(@PathVariable Long id) {
        assignStaffService.delete(id);

    }
}
