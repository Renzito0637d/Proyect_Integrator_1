package com.ucv.Docs;

import com.ucv.Entity.Category;
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
import java.util.List;

public class CategoryPDF {

    public static void writeCategoryToPDF(List<Category> categoryList, OutputStream out, InputStream logo) throws Exception {
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
        Paragraph title = new Paragraph("Lista de Categorías")
                .setFontSize(16)
                .setFont(PdfFontFactory.createFont("Helvetica-Bold"))
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        document.add(title);

        // Tabla
        String[] headers = {"ID", "Tipo", "Nivel Prioridad", "Categoría", "Descripción"};
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
        for (Category cat : categoryList) {
            table.addCell(new Cell().add(new Paragraph(String.valueOf(cat.getId()))));
            table.addCell(new Cell().add(new Paragraph(cat.getType() != null ? cat.getType() : "")));
            table.addCell(new Cell().add(new Paragraph(cat.getPrioritylevel() != null ? cat.getPrioritylevel() : "")));
            table.addCell(new Cell().add(new Paragraph(cat.getCategory() != null ? cat.getCategory() : "")));
            table.addCell(new Cell().add(new Paragraph(cat.getDescription() != null ? cat.getDescription() : "")));            
        }

        document.add(table);
        document.close();
    }
}
