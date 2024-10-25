package com.springdemo.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "med_record")
public class Records {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "content", nullable = false)
    private byte []imgdata;

   
    @Column(name="description",nullable=false)
    private String description;

    
}
