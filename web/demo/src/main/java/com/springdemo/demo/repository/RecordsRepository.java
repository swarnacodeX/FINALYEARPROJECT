package com.springdemo.demo.repository;

import com.springdemo.demo.model.Records;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordsRepository extends JpaRepository<Records, String> {
    // No additional methods are needed as JpaRepository already provides CRUD methods.
}
