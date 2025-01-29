package main.java.records.record.services;

import main.java.records.record.model.Record;

import java.util.List;

public interface RecordsService {
    Record addRecord(Record record);
    List<Record> getRecordsByEmail(String email);
    Record editRecord(String id, Record record);
    void deleteRecord(String id);
}