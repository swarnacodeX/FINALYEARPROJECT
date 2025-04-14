package com.example.profile.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="profile")
public class Profile {
     @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "weight", nullable = false)
    private String weight;

    @Column(name = "height", nullable = false)
    private String height;

    @Column(name="bloodgroup", nullable=false)
    private String bloodgroup;

    
}
