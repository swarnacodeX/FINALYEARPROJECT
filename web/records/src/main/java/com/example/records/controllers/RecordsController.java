package com.example.records.controllers;
import com.example.records.model.Records;
import com.example.records.services.RecordsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "*") 
public class RecordsController {

    private final RecordsService recordsService;

    public RecordsController(RecordsService recordsService) {
        this.recordsService = recordsService;
    }

    @PostMapping("/add")
public ResponseEntity<Records> addRecord(
        @RequestPart("email") String email,
        @RequestPart("record_title") String recordTitle,
        @RequestPart("record_description") String recordDescription,
        @RequestPart("file") MultipartFile file) {
    
    // Create a new record object
    Records record = new Records();
    record.setRecord_id(UUID.randomUUID().toString());
    record.setEmail(email);
    record.setRecord_title(recordTitle);
    record.setRecord_description(recordDescription);

    // Save the record using the correct method
    try {
        Records savedRecord = recordsService.addRecord(record, file);
        return ResponseEntity.ok(savedRecord);
    } catch (IOException e) {
        return ResponseEntity.internalServerError().build(); // Return 500 Internal Server Error
    }
}


    @GetMapping("/{email}")
    public ResponseEntity<List<Records>> getRecordsByEmail(@PathVariable String email) {
        List<Records> records = recordsService.getRecordsByEmail(email);
        return ResponseEntity.ok(records);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editRecord(
            @PathVariable String id,
            @RequestPart("record_title") String recordTitle,
            @RequestPart("record_description") String recordDescription,
            @RequestPart(value = "file", required = false) MultipartFile file) {
                try {
                    // Create a new Records object and set updated fields
                    Records record = new Records();
                    record.setRecord_title(recordTitle);
                    record.setRecord_description(recordDescription);
            
                    Optional<Records> updatedRecord = recordsService.editRecord(id, record, file);
            
                    return updatedRecord
        .map(ResponseEntity::ok) // If present, return ResponseEntity.ok(updatedRecord)
        .orElseGet(() -> ResponseEntity.notFound().build()); 
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("Error updating record: " + e.getMessage());
                }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable String id) {
        try {
            recordsService.deleteRecord(id);
            return ResponseEntity.ok("Record deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting record: " + e.getMessage());
        }
    }
}
