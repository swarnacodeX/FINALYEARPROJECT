package main.java.records.record.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "records")
public class Record {
    @Id
    @Column(name = "idrecords", nullable = false)
    private String idrecords;

    @Column(name = "recordstitle", nullable = false)
    private String recordstitle;

    @Column(name = "recordsdescription", nullable = false)
    private String recordsdescription;

    @Column(name = "prescriptions", nullable = false)
    private byte[] prescriptions;

    @Column(name = "email", nullable = false)
    private String email;
}