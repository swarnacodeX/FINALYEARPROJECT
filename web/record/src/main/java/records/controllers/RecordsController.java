package records.controllers;
import records.model.Records;
import records.services.RecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/records")
public class RecordsController {

    @Autowired
    private RecordsService recordsService;

    @PostMapping("/add")
    public ResponseEntity<Records> addRecord(@RequestBody Records record) {
        record.setRecord_id(UUID.randomUUID().toString());
        
        Records savedRecord = recordsService.addRecord(record);
        return ResponseEntity.ok(savedRecord);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Records>> getRecordsByEmail(@PathVariable String email) {
        List<Records> records = recordsService.getRecordsByEmail(email);
        return ResponseEntity.ok(records);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Records> editRecord(@PathVariable String id, @RequestBody Records record) {
        Records updatedRecord = recordsService.editRecord(id, record);
        return ResponseEntity.ok(updatedRecord);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String id) {
        recordsService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}