package main.java.records.record.repository;

import main.java.records.record.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordsRepository extends JpaRepository<Record, String> {
    List<Record> findByEmail(String email);
}