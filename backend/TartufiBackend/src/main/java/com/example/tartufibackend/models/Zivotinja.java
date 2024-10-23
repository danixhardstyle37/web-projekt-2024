package com.example.tartufibackend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Zivotinja")
public class Zivotinja {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Ime")
    private String ime;

    @Column(name = "Vrsta")
    private String vrsta;

    @Column(name = "Opis")
    private String opis;


}
