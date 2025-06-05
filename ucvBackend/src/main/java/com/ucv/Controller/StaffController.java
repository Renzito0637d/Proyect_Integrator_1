package com.ucv.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Entity.User;
import com.ucv.Services.StaffService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ucv")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @PostMapping("/staffList")
    public List<User> getStaffList() {
    return staffService.getAll();
}
}
