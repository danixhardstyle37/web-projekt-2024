package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepo extends JpaRepository<Korisnik,Integer> {

}
