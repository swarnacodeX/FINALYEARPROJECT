package records.services;


import records.model.Records;
import records.repository.RecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecordsServiceImpl implements RecordsService {

    @Autowired
    private RecordsRepository recordsRepository;

    @Override
    public Records addRecord(Records record) {
        return recordsRepository.save(record);
    }

    @Override
    public List<Records> getRecordsByEmail(String email) {
        return recordsRepository.findByEmail(email);
    }

    @Override
    public Records editRecord(String id, Records record) {
        Optional<Records> existingRecordOpt = recordsRepository.findById(id);
        if (existingRecordOpt.isPresent()) {
            Records existingRecord = existingRecordOpt.get();
            existingRecord.setRecord_title(record.getRecord_title());
            existingRecord.setRecord_description(record.getRecord_description());
            existingRecord.setPrescription(record.getPrescription());
            existingRecord.setEmail(record.getEmail());
            return recordsRepository.save(existingRecord);
        } else {
            throw new RuntimeException("Record not found with id: " + id);
        }
    }

    @Override
    public void deleteRecord(String id) {
        recordsRepository.deleteById(id);
    }
}