package com.ucv.DAO;

import java.util.List;

import com.ucv.Entity.Report;

public interface ReportDAO {
    public List<Report> getAll();
    public Report getById(Long id);    
    public void save(Report report);
    public void delete(Long id);
    public void update(Report report);    
}
