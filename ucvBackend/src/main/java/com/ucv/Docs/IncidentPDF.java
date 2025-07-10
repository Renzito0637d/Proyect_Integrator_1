package com.ucv.Docs;

import com.ucv.Entity.Incident;
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

public class IncidentPDF {

    public static void writeIncidentToPDF(List<Incident> incidentList, OutputStream out, InputStream logo) throws Exception {
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
        Paragraph title = new Paragraph("Lista de Incidentes")
                .setFontSize(16)
                .setFont(PdfFontFactory.createFont("Helvetica-Bold"))
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        document.add(title);

        // Tabla
        String[] headers = {
            "ID", "Usuario Registrado", "Descripción", "Área", "Fecha Registro", "Fecha Incidente",
            "Nivel Prioridad", "Departamento", "Categoría", "Usuario"
        };
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
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (Incident inc : incidentList) {
            table.addCell(new Cell().add(new Paragraph(String.valueOf(inc.getId()))));
            table.addCell(new Cell().add(new Paragraph(inc.getRegisteredUser() != null ? inc.getRegisteredUser() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getDescription() != null ? inc.getDescription() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getArea() != null ? inc.getArea() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getRegisteredDate() != null ? inc.getRegisteredDate().format(dateTimeFormatter) : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getIncidenDate() != null ? inc.getIncidenDate().format(dateFormatter) : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getPrioritylevel() != null ? inc.getPrioritylevel() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getDeparment() != null && inc.getDeparment().getName() != null ? inc.getDeparment().getName() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getCategory() != null && inc.getCategory().getCategory() != null ? inc.getCategory().getCategory() : "")));
            table.addCell(new Cell().add(new Paragraph(inc.getUser() != null && inc.getUser().getUsername() != null ? inc.getUser().getUsername() : "")));
        }

        document.add(table);
        document.close();
    }
}
