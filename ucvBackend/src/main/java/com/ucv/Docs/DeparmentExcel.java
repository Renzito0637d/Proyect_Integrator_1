package com.ucv.Docs;

import com.google.common.io.ByteStreams;
import com.ucv.Entity.Deparment;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;

import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class DeparmentExcel {

    public static void writeDeparmentToExcel(List<Deparment> deparmentList, OutputStream out, InputStream logo) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Deparments");

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
        String[] headers = {"ID", "Usuario Registrado", "Nombre", "Torre", "Piso", "Aula", "Fecha Registro", "Código"};
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Deparment dep : deparmentList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(dep.getId());
            row.createCell(1).setCellValue(dep.getRegisteredUser());
            row.createCell(2).setCellValue(dep.getName());
            row.createCell(3).setCellValue(dep.getTower());
            row.createCell(4).setCellValue(dep.getFloor());
            row.createCell(5).setCellValue(dep.getClassroom());
            row.createCell(6).setCellValue(dep.getRegisteredDate() != null ? dep.getRegisteredDate().format(formatter) : "");
            row.createCell(7).setCellValue(dep.getCode());

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
