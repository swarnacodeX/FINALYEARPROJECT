package com.example.records.services;

import com.google.api.client.http.AbstractInputStreamContent;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.auth.oauth2.GoogleCredentials;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.records.model.Records;
import com.example.records.repository.RecordsRepository;

import java.io.*;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RecordsServiceImpl implements RecordsService {

    @Autowired
    private RecordsRepository recordsRepository;

  
    private String APPLICATION_NAME="MyFirstApp";

    
    private String SERVICE_ACCOUNT_KEY_PATH = "C:\\Users\\shubh\\Downloads\\booklovers-service-account.json";

   
    private String FOLDER_ID="1DezsJGtQ1tGURAX1npjNfJ5zMT71sL3f";

    private Drive getDriveService() throws IOException {
        java.io.File keyFile = new java.io.File(SERVICE_ACCOUNT_KEY_PATH);
        if (!keyFile.exists()) {
            throw new FileNotFoundException("Service account key file not found at: " + SERVICE_ACCOUNT_KEY_PATH);
        }

        try (InputStream inputStream = new FileInputStream(keyFile)) {
            GoogleCredentials credentials = ServiceAccountCredentials.fromStream(inputStream)
                    .createScoped(Collections.singletonList("https://www.googleapis.com/auth/drive"));

            return new Drive.Builder(new NetHttpTransport(), new JacksonFactory(), new HttpCredentialsAdapter(credentials))
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        }
    }

    private String uploadFileToDrive(MultipartFile file) throws IOException {
        Drive driveService = getDriveService();

        File fileMetadata = new File();
        fileMetadata.setName(file.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(FOLDER_ID));

        AbstractInputStreamContent fileContent = new InputStreamContent(file.getContentType(), file.getInputStream());

        File uploadedFile = driveService.files().create(fileMetadata, fileContent)
                .setFields("id")
                .execute();

        // Set file permission to "Anyone with the link can view"
        Permission permission = new Permission()
                .setType("anyone")
                .setRole("reader");
        driveService.permissions().create(uploadedFile.getId(), permission).execute();

        return "https://drive.google.com/file/d/" + uploadedFile.getId() + "/view";
    }

    private void deleteFileFromDrive(String fileLink) {
        if (fileLink == null || !fileLink.contains("/d/")) {
            return;
        }
        String fileId = fileLink.split("/d/")[1].split("/")[0];

        try {
            Drive driveService = getDriveService();
            driveService.files().delete(fileId).execute();
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file from Google Drive: " + e.getMessage(), e);
        }
    }

    @Transactional
    @Override
    public Records addRecord(Records record, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be null or empty.");
        }

        try {
            String fileLink = uploadFileToDrive(file);
            record.setFile_link(fileLink);
            return recordsRepository.save(record);
        } catch (IOException e) {
            throw new RuntimeException("File upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Records> getRecordsByEmail(String email) {
        return recordsRepository.findByEmail(email);
        }

 @Override
 @Transactional
 public Optional<Records> editRecord(String id, Records record, MultipartFile file) {
        Records existingRecord = recordsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Record not found with id: " + id));

        existingRecord.setRecord_title(record.getRecord_title());
        existingRecord.setRecord_description(record.getRecord_description());
        existingRecord.setEmail(record.getEmail());

        if (file != null && !file.isEmpty()) {
            try {
            // Delete old file before uploading a new one
            deleteFileFromDrive(existingRecord.getFile_link());

            String fileLink = uploadFileToDrive(file);
            existingRecord.setFile_link(fileLink);
            } catch (IOException e) {
            throw new RuntimeException("File upload failed: " + e.getMessage(), e);
            }
        }

        recordsRepository.save(existingRecord);
        return Optional.of(existingRecord);
        }
        

    @Transactional
    @Override
    public Optional<Records> deleteRecord(String id) {
        Records existingRecord = recordsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Record not found with id: " + id));

        // Delete file from Google Drive
        deleteFileFromDrive(existingRecord.getFile_link());

        recordsRepository.deleteById(id);
        return Optional.of(existingRecord);
    }
}
