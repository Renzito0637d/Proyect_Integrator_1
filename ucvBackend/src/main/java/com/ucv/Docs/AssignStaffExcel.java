package com.ucv.Docs;

import com.google.common.io.ByteStreams;
import com.ucv.Entity.AssignStaff;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;

import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class AssignStaffExcel {

    public static void writeAssignStaffToExcel(List<AssignStaff> assignStaffList, OutputStream out, InputStream logo) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("AssignStaff");

        // Insertar logo en la parte superior izquierda (A2)
        if (logo != null) {
            byte[] bytes = ByteStreams.toByteArray(logo);
            int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_JPEG);
            XSSFDrawing drawing = (XSSFDrawing) sheet.createDrawingPatriarch();
            XSSFClientAnchor anchor = new XSSFClientAnchor(
                0, 0, 0, 0,
                0, 1, 2, 4
            );
            anchor.setAnchorType(ClientAnchor.AnchorType.MOVE_DONT_RESIZE);
            drawing.createPicture(anchor, pictureIdx);
        }

        // Crear estilo para el encabezado
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 12);
        headerFont.setColor(IndexedColors.WHITE.getIndex());
        headerStyle.setFont(headerFont);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        // Crear fila del encabezado
        Row headerRow = sheet.createRow(4);
        String[] headers = {
            "ID", "Incidente ID", "Fecha Registro", "Usuario Asignado", "Personal a cargo", "Fecha Solución", "Estado", "Descripción"
        };
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Estilo para filas
        CellStyle rowStyle = workbook.createCellStyle();
        rowStyle.setBorderBottom(BorderStyle.THIN);
        rowStyle.setBorderTop(BorderStyle.THIN);
        rowStyle.setBorderLeft(BorderStyle.THIN);
        rowStyle.setBorderRight(BorderStyle.THIN);

        // Llenar datos
        int rowNum = 5;
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (AssignStaff as : assignStaffList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(as.getId());
            row.createCell(1).setCellValue(as.getIncident() != null ? as.getIncident().getId() : null);
            row.createCell(2).setCellValue(as.getRegisteredDate() != null ? as.getRegisteredDate().format(dateTimeFormatter) : "");
            row.createCell(3).setCellValue(as.getAssignedUser());
            row.createCell(4).setCellValue(as.getUser() != null ? as.getUser().getNickname() : "");
            row.createCell(5).setCellValue(as.getDateSolution() != null ? as.getDateSolution().format(dateFormatter) : "");
            row.createCell(6).setCellValue(as.getStatus());
            row.createCell(7).setCellValue(as.getDescription());

            for (int i = 0; i < headers.length; i++) {
                row.getCell(i).setCellStyle(rowStyle);
            }
        }

        // Ajustar ancho de columnas
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(out);
        workbook.close();
    }
}
