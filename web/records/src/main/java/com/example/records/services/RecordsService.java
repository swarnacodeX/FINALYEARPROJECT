package com.example.records.services;

import org.springframework.web.multipart.MultipartFile;
import com.example.records.model.Records;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface RecordsService {
    Records addRecord(Records record, MultipartFile file) throws IOException;
    List<Records> getRecordsByEmail(String email);
    Optional<Records> editRecord(String id, Records record, MultipartFile file) throws IOException;
    Optional<Records> deleteRecord(String id);
}
