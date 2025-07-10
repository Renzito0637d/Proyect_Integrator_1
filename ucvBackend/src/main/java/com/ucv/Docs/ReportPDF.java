package com.ucv.Docs;

import com.ucv.Entity.Report;
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

public class ReportPDF {

    public static void writeReportToPDF(List<Report> reportList, OutputStream out, InputStream logo) {
        try {
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
            Paragraph title = new Paragraph("Lista de Reportes de Personal")
                    .setFontSize(16)
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(15);
            document.add(title);

            // Encabezados
            String[] headers = {
                "ID","Usuario Reportante", "Acciones Realizadas", 
                "Estado", "Fecha Resolución", "Asignación ID",  "Descripción"
            };
            Table table = new Table(headers.length);
            table.setWidth(UnitValue.createPercentValue(100));

            for (String h : headers) {
                Cell cell = new Cell().add(new Paragraph(h))
                        .setBackgroundColor(ColorConstants.BLUE)
                        .setFontColor(ColorConstants.WHITE)
                        .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                        .setTextAlignment(TextAlignment.CENTER)
                        .setBorder(new SolidBorder(ColorConstants.BLACK, 1));
                table.addHeaderCell(cell);
            }

            // Formateador de fechas
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // Filas de datos
            for (Report report : reportList) {
                table.addCell(new Cell().add(new Paragraph(report.getId() != null ? report.getId().toString() : "")));
                table.addCell(new Cell().add(new Paragraph(report.getUser() != null ? report.getUser().getNickname() : "")));
                table.addCell(new Cell().add(new Paragraph(report.getActions() != null ? report.getActions() : "")));
                table.addCell(new Cell().add(new Paragraph(report.getStatus() != null ? report.getStatus() : "")));
                table.addCell(new Cell().add(new Paragraph(report.getResolutionDate() != null ? report.getResolutionDate().format(dateFormatter) : "")));
                table.addCell(new Cell().add(new Paragraph(report.getAssignStaff() != null ? report.getAssignStaff().getId().toString() : "")));
                table.addCell(new Cell().add(new Paragraph(report.getDescripcion() != null ? report.getDescripcion() : "")));
            }

            document.add(table);
            System.out.println("✅ ReportPDF generado correctamente.");
            document.close();
        } catch (Exception e) {
            System.err.println("❌ Error generando ReportPDF:");
            e.printStackTrace();
        }
    }
}
