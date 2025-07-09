package com.ucv.Services;

import com.ucv.DAO.ReportDAO;
import com.ucv.Entity.Report;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService{

    @Autowired
    private ReportDAO reportDAO;
    @Override
    public List<Report> getAll() {
        return reportDAO.getAll();
    }

    @Override
    public Report getById(Long id) {
        return reportDAO.getById(id);
    }

    @Override
    public void save(Report report) {
        reportDAO.save(report);
    }

    @Override
    public void update(Report report) {
        reportDAO.save(report);
    }

    @Override
    public void delete(Long id) {
        reportDAO.delete(id);
    }
}
