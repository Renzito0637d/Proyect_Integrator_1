package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Report;
import com.ucv.Repository.ReportRepository;
import org.apache.commons.lang3.StringUtils;

@Repository
public class ReportDAOImpl implements ReportDAO{

    @Autowired
    ReportRepository reportRepository;
    @Override
    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    @Override
    public Report getById(Long id) {
        return reportRepository.findById(id).get();
    }

    @Override
    public void save(Report report) {
        // Normaliza los espacios en descripcion antes de guardar
        if (report.getDescripcion() != null) {
            report.setDescripcion(StringUtils.normalizeSpace(report.getDescripcion()));
        }
        reportRepository.save(report);
    }

    @Override
    public void delete(Long id) {
        Report reportObj = reportRepository.findById(id).get();
        reportRepository.delete(reportObj);
    }

    @Override
    public void update(Report report) {
        // Normaliza los espacios en descripcion antes de actualizar
        if (report.getDescripcion() != null) {
            report.setDescripcion(StringUtils.normalizeSpace(report.getDescripcion()));
        }
        reportRepository.save(report);
    }
    
}
