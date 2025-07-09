package com.ucv.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucv.Entity.Role;
import com.ucv.Entity.User;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<User, Long> {
    List<User> findByActiveTrue();
    List<User> findByRole(Role role);
}
