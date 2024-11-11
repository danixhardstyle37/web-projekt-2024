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
@Table(name = "Forum")
public class Forum {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "Id_korisnik", referencedColumnName = "Id")
    private Korisnik korisnik;

    @Column(name = "message")
    private String message;

    @Column(name = "animal")
    private char animal;

    @Column(name = "img_pth")
    private String imgPth;
}
