package com.ucv.Docs;

import com.ucv.Entity.AssignStaff;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.borders.SolidBorder;

import java.io.InputStream;
import java.io.OutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class AssignStaffPDF {

    public static void writeAssignStaffToPDF(List<AssignStaff> assignStaffList, OutputStream out, InputStream logo) throws Exception {
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4.rotate());

        // Logo
        if (logo != null) {
            byte[] logoBytes = logo.readAllBytes();
            Image img = new Image(ImageDataFactory.create(logoBytes));
            img.setWidth(100);
            img.setHeight(60);
            img.setMarginBottom(10);
            document.add(img);
        }

        // Título
        Paragraph title = new Paragraph("Lista de Asignaciones de Personal")
                .setFontSize(16)
                .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        document.add(title);

        // Tabla
        String[] headers = {
            "ID", "Incidente ID", "Fecha Registro", "Usuario Asignado", "Personal a cargo", "Fecha Solución", "Estado", "Descripción"
        };
        Table table = new Table(headers.length);
        table.setWidth(UnitValue.createPercentValue(100));

        // Encabezados
        for (String h : headers) {
            Cell cell = new Cell().add(new Paragraph(h))
                    .setBackgroundColor(ColorConstants.BLUE)
                    .setFontColor(ColorConstants.WHITE)
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBorder(new SolidBorder(ColorConstants.BLACK, 1));
            table.addHeaderCell(cell);
        }

        // Filas de datos
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (AssignStaff as : assignStaffList) {
            table.addCell(new Cell().add(new Paragraph(as.getId() != null ? String.valueOf(as.getId()) : "")));
            table.addCell(new Cell().add(new Paragraph(as.getIncident() != null ? String.valueOf(as.getIncident().getId()) : "")));
            table.addCell(new Cell().add(new Paragraph(as.getRegisteredDate() != null ? as.getRegisteredDate().format(dateTimeFormatter) : "")));
            table.addCell(new Cell().add(new Paragraph(as.getAssignedUser() != null ? as.getAssignedUser() : "")));
            table.addCell(new Cell().add(new Paragraph(as.getUser() != null && as.getUser().getNickname() != null ? as.getUser().getNickname() : "")));
            table.addCell(new Cell().add(new Paragraph(as.getDateSolution() != null ? as.getDateSolution().format(dateFormatter) : "")));
            table.addCell(new Cell().add(new Paragraph(as.getStatus() != null ? as.getStatus() : "")));
            table.addCell(new Cell().add(new Paragraph(as.getDescription() != null ? as.getDescription() : "")));
        }

        document.add(table);
        System.out.println("PDF generado correctamente");
        document.close();
    }
}
