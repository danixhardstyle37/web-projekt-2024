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
@Table(name = "Vodic")
public class Vodic {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Ime_prezime")
    private String imePrezime;

    @Column(name = "Broj_tura")
    private Integer brojTura;

    @Column(name = "Opis")
    private String opis;

    @Column(name = "Broj_telefona")
    private String broj_telefona;


}
