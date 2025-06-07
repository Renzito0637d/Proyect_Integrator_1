package com.ucv.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucv.Docs.StaffExcel;
import com.ucv.Entity.User;
import com.ucv.Services.StaffService;

import com.ucv.Docs.StaffExcel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.ByteArrayOutputStream;
import java.io.File;

@RestController
@RequestMapping("/api/ucv")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @PostMapping("/staffList")
    public List<User> getStaffList() {
        return staffService.getAll();
    }

    @PostMapping("/staffExcel")
    public ResponseEntity<byte[]> downloadStaffExcel() throws Exception {
        List<User> staffList = staffService.getAll();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        StaffExcel.writeStaffToExcel(staffService.getAll(), new File("ruta/deseada/staff.xlsx"));

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=staff.xlsx")
            .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
            .body(out.toByteArray());
    }
}
