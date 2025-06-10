package com.ucv.Docs;

import com.google.common.io.ByteStreams;
import com.ucv.Entity.User;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;

import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class StaffExcel {

    public static void writeStaffToExcel(List<User> staffList, OutputStream out, InputStream logo) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Staff");

        // Insertar logo en la parte superior izquierda (A2)
        if (logo != null) {
            byte[] bytes = ByteStreams.toByteArray(logo);
            int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_JPEG);
            XSSFDrawing drawing = (XSSFDrawing) sheet.createDrawingPatriarch();
            // Anchor: col1, row1, x1, y1, col2, row2, x2, y2
            // Esto coloca el logo en la celda A2 (col=0, row=1)
            XSSFClientAnchor anchor = new XSSFClientAnchor(
                0, 0, 0, 0, // x1, y1, x2, y2 (offsets)
                0, 1, 2, 4  // col1, row1, col2, row2 (ocupa varias celdas)
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
        Row headerRow = sheet.createRow(4); // Dejar espacio para el logo y título
        String[] headers = {"ID", "Nombre", "Apellido", "Email", "Teléfono", "Usuario","Rol","Cargo"};
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
        for (User user : staffList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(user.getId());
            row.createCell(1).setCellValue(user.getFirstname());
            row.createCell(2).setCellValue(user.getLastname());
            row.createCell(3).setCellValue(user.getEmail());
            row.createCell(4).setCellValue(user.getPhone());
            row.createCell(5).setCellValue(user.getNickname());
            row.createCell(6).setCellValue(user.getRole().toString());
            row.createCell(7).setCellValue(user.getCargo());

            for (int i = 0; i < 8; i++) {
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
