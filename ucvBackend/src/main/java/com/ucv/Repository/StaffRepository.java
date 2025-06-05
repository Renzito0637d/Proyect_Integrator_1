package com.ucv.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ucv.Entity.User;

@Repository
public interface StaffRepository extends JpaRepository<User, Long> {
    
}
