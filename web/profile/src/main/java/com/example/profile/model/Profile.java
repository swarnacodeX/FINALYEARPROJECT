package com.example.profile.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "profile")
public class Profile {

    @Id
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "age", nullable = false)
    private short age; // SMALLINT

    @Column(name = "weight", nullable = false)
    private short weight; // SMALLINT

    @Column(name = "height", nullable = false)
    private short height; // SMALLINT

    @Column(name = "bloodgroup", nullable = false)
    private String bloodgroup;
}
