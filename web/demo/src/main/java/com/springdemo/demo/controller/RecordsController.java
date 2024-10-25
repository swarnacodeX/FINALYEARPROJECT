package com.springdemo.demo.controller;

import com.springdemo.demo.model.Records;
import com.springdemo.demo.service.RecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class RecordsController {

    @Autowired
    private RecordsService recordsService;

    // Create a new record (POST)
    @PostMapping("/create")
    public ResponseEntity<Records> createRecord(
        @RequestParam("email") String email,
        @RequestParam("description") String description,
        @RequestParam("image") byte[] imgdata) {

        Records record = new Records(email, imgdata, description);
        Records createdRecord = recordsService.createRecord(record);
        return new ResponseEntity<>(createdRecord, HttpStatus.CREATED);
    }

    // Update an existing record (PUT)
    @PutMapping("/update/{email}")
    public ResponseEntity<Records> updateRecord(
        @PathVariable String email,
        @RequestParam("type") String type,
        @RequestParam("description") String description,
        @RequestParam("image") byte[] imgdata) {

        Records record = new Records(email, imgdata,description);
        Records updatedRecord = recordsService.updateRecord(email, record);
        return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
    }

    // Get all records (GET)
    @GetMapping("/all")
    public ResponseEntity<List<Records>> getAllRecords() {
        List<Records> records = recordsService.getAllRecords();
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    // Get a record by email (GET)
    @GetMapping("/{email}")
    public ResponseEntity<Records> getRecordByEmail(@PathVariable String email) {
        Records record = recordsService.getRecordByEmail(email);
        return new ResponseEntity<>(record, HttpStatus.OK);
    }

    // Delete a record by email (DELETE)
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String email) {
        recordsService.deleteRecordByEmail(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
