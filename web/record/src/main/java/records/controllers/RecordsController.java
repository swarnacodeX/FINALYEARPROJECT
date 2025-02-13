package records.controllers;
import records.model.Record;
import records.services.RecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/records")
public class RecordsController {

    @Autowired
    private RecordsService recordsService;

    @PostMapping("/add")
    public ResponseEntity<Record> addRecord(@RequestBody Record record) {
        record.setIdrecords(UUID.randomUUID().toString());
        Record savedRecord = recordsService.addRecord(record);
        return ResponseEntity.ok(savedRecord);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Record>> getRecordsByEmail(@PathVariable String email) {
        List<Record> records = recordsService.getRecordsByEmail(email);
        return ResponseEntity.ok(records);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Record> editRecord(@PathVariable String id, @RequestBody Record record) {
        Record updatedRecord = recordsService.editRecord(id, record);
        return ResponseEntity.ok(updatedRecord);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String id) {
        recordsService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}