package com.ucv.Docs;

import com.ucv.Entity.Deparment;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFontFactory;
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

public class DeparmentPDF {

    public static void writeDeparmentToPDF(List<Deparment> deparmentList, OutputStream out, InputStream logo) throws Exception {
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);

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
        Paragraph title = new Paragraph("Lista de Departamentos")
                .setFontSize(16)
                .setFont(PdfFontFactory.createFont("Helvetica-Bold"))
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        document.add(title);

        // Tabla
        String[] headers = {"ID", "Usuario Registrado", "Nombre", "Torre", "Piso", "Aula", "Fecha Registro", "Código"};
        Table table = new Table(headers.length);
        table.setWidth(UnitValue.createPercentValue(100));

        // Encabezados
        for (String h : headers) {
            Cell cell = new Cell().add(new Paragraph(h))
                    .setBackgroundColor(ColorConstants.BLUE)
                    .setFontColor(ColorConstants.WHITE)
                    .setFont(PdfFontFactory.createFont("Helvetica-Bold"))
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBorder(new SolidBorder(ColorConstants.BLACK, 1));
            table.addHeaderCell(cell);
        }

        // Filas de datos
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Deparment dep : deparmentList) {
            table.addCell(new Cell().add(new Paragraph(String.valueOf(dep.getId()))));
            table.addCell(new Cell().add(new Paragraph(dep.getRegisteredUser() != null ? dep.getRegisteredUser() : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getName() != null ? dep.getName() : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getTower() != null ? dep.getTower() : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getFloor() != null ? dep.getFloor() : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getClassroom() != null ? dep.getClassroom() : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getRegisteredDate() != null ? dep.getRegisteredDate().format(formatter) : "")));
            table.addCell(new Cell().add(new Paragraph(dep.getCode() != null ? dep.getCode() : "")));
        }

        document.add(table);
        document.close();
    }
}
