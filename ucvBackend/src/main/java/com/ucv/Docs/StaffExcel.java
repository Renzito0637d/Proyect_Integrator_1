package com.ucv.Docs;

import com.ucv.Entity.User;
import com.google.common.io.Files;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class StaffExcel {

    public static void writeStaffToExcel(List<User> staffList, File file) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Staff");

        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Nombre");
        headerRow.createCell(2).setCellValue("Apellido");
        headerRow.createCell(3).setCellValue("Email");
        headerRow.createCell(4).setCellValue("Teléfono");
        headerRow.createCell(5).setCellValue("Usuario");

        int rowNum = 1;
        for (User user : staffList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(user.getId());
            row.createCell(1).setCellValue(user.getFirstname());
            row.createCell(2).setCellValue(user.getLastname());
            row.createCell(3).setCellValue(user.getEmail());
            row.createCell(4).setCellValue(user.getPhone());
            row.createCell(5).setCellValue(user.getUsername());
        }

        // Usando Guava para crear los directorios padres si no existen
        Files.createParentDirs(file);

        try (FileOutputStream fos = new FileOutputStream(file)) {
            workbook.write(fos);
        }
        workbook.close();
    }
}