package records.services;

import records.model.Records;

import java.util.List;

public interface RecordsService {
    Records addRecord(Records record);
    List<Records> getRecordsByEmail(String email);
    Records editRecord(String id, Records record);
    void deleteRecord(String id);
}