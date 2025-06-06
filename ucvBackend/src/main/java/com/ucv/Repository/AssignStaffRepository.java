package com.ucv.Repository;

import com.ucv.Entity.AssignStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignStaffRepository extends JpaRepository<AssignStaff,Long> {

    
}