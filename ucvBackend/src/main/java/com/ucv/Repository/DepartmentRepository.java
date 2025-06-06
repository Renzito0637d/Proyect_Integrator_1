package com.ucv.Repository;

import com.ucv.Entity.Deparment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Deparment,Long> {
    
}
