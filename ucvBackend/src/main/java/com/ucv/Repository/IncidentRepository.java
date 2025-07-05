package com.ucv.Repository;

import com.ucv.Entity.Incident;
import com.ucv.Entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository extends JpaRepository<Incident,Long> {
    List<Incident> findByUser(User user);
}
