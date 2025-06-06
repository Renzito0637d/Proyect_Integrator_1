package com.ucv.DAO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ucv.Entity.Report;
import com.ucv.Repository.ReportRepository;

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
    public void save(Report deparment) {
        reportRepository.save(deparment);
    }

    @Override
    public void delete(Long id) {
        Report reportObj = reportRepository.findById(id).get();
        reportRepository.delete(reportObj);
    }

    @Override
    public void update(Report deparment) {
        reportRepository.save(deparment);
    }
    
}
