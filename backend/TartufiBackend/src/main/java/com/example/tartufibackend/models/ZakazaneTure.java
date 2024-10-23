package com.example.tartufibackend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Zakazane_ture")
public class ZakazaneTure {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "Id_tura", referencedColumnName = "Id")
    private Tura tura;

    @ManyToOne
    @JoinColumn(name = "Id_korisnik", referencedColumnName = "Id")
    private Korisnik korisnik;

    @ManyToOne
    @JoinColumn(name = "Id_vodic", referencedColumnName = "Id")
    private Vodic vodic;

    @ManyToOne
    @JoinColumn(name = "Id_zivotinja", referencedColumnName = "Id")
    private Zivotinja zivotinja;

    @Column(name = "date_time_od")
    private LocalDateTime dateTime_Od;

    @Column(name = "date_time_do")
    private LocalDateTime dateTime_Do;

}
