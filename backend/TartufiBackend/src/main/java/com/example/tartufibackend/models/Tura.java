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
@Table(name = "Tura")
public class Tura {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "Id_duljine", referencedColumnName = "Id")
    private Duljina duljina;

    @Column(name = "Ime")
    private String ime;

    @Column(name = "Opis")
    private String opis;


}
