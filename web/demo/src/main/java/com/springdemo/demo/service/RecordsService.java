package com.springdemo.demo.service;

import com.springdemo.demo.model.Records;
import com.springdemo.demo.repository.RecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecordsService {

    @Autowired
    private RecordsRepository recordsRepository;

    // Create a new record
    public Records createRecord(Records record) {
        return recordsRepository.save(record);
    }

    // Update an existing record by email
    public Records updateRecord(String email, Records record) {
        Optional<Records> existingRecord = recordsRepository.findById(email);
        if (existingRecord.isPresent()) {
            Records updatedRecord = existingRecord.get();
            updatedRecord.setImgdata(record.getImgdata());
            updatedRecord.setDescription(record.getDescription());
            return recordsRepository.save(updatedRecord);
        } else {
            throw new RuntimeException("Record not found with email: " + email);
        }
    }

    // Get all records
    public List<Records> getAllRecords() {
        return recordsRepository.findAll();
    }

    // Get a record by email
    public Records getRecordByEmail(String email) {
        return recordsRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Record not found with email: " + email));
    }

    // Delete a record by email
    public void deleteRecordByEmail(String email) {
        recordsRepository.deleteById(email);
    }
}
