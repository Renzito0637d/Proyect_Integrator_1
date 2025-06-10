package com.ucv.DAO;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Deparment;
import com.ucv.Repository.DepartmentRepository;

@Repository
public class DeparmentDAOImpl implements DeparmentDAO{

    @Autowired
    DepartmentRepository deparmentRepository;
    @Override
    public List<Deparment> getAll() {
        return deparmentRepository.findAll();
    }

    @Override
    public Deparment getById(Long id) {
        return deparmentRepository.findById(id).get();
    }

    @Override
    public void save(Deparment deparment) {
        // Normaliza los espacios en el nombre del departamento antes de guardar
        if (deparment.getName() != null) {
            deparment.setName(StringUtils.normalizeSpace(deparment.getName()));
        }
        if (deparment.getClassroom() != null) {
            deparment.setClassroom(StringUtils.normalizeSpace(deparment.getClassroom()));
        }
        deparmentRepository.save(deparment);
    }

    @Override
    public void delete(Long id) {
        Deparment deparmentObj = deparmentRepository.findById(id).get();
        deparmentRepository.delete(deparmentObj);
    }

    @Override
    public void update(Deparment deparment) {
        if (deparment.getName() != null) {
            deparment.setName(StringUtils.normalizeSpace(deparment.getName()));
        }
        if (deparment.getClassroom() != null) {
            deparment.setClassroom(StringUtils.normalizeSpace(deparment.getClassroom()));
        }
        deparmentRepository.save(deparment);
    }
    
}
