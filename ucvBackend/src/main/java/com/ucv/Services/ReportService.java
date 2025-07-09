package com.ucv.Services;

import com.ucv.Entity.Report;

import java.util.List;

public interface ReportService {
    public List<Report> getAll();
    public Report getById(Long id);
    public void save(Report report);
    public void update(Report report);
    public void delete(Long id);
}
