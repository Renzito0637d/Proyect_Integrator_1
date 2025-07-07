package com.ucv.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.AssignStaff;
import com.ucv.Services.AssignStaffService;

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
        if(actual==null){
            return ResponseEntity.notFound().build();
        }
        actual.setIncident(assignStaff.getIncident());
        actual.setUser(assignStaff.getUser());
        actual.setDateSolution(assignStaff.getDateSolution());
        actual.setStatus(assignStaff.getStatus());
        actual.setDescription(assignStaff.getDescription());

        return ResponseEntity.ok(actual);
    }

    @DeleteMapping("assignStaddDelete/{id}")
    public void assignStaddDelete(@PathVariable Long id){
        assignStaffService.delete(id);
        
    }
}
