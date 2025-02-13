package records.services;


import records.model.Record;
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
    public Record addRecord(Record record) {
        return recordsRepository.save(record);
    }

    @Override
    public List<Record> getRecordsByEmail(String email) {
        return recordsRepository.findByEmail(email);
    }

    @Override
    public Record editRecord(String id, Record record) {
        Optional<Record> existingRecordOpt = recordsRepository.findById(id);
        if (existingRecordOpt.isPresent()) {
            Record existingRecord = existingRecordOpt.get();
            existingRecord.setRecordstitle(record.getRecordstitle());
            existingRecord.setRecordsdescription(record.getRecordsdescription());
            existingRecord.setPrescriptions(record.getPrescriptions());
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