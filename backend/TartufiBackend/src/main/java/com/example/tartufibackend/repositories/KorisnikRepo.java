package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KorisnikRepo extends JpaRepository<Korisnik,Integer> {
    Optional<Korisnik> findByUsername(String username);
    Optional<Korisnik> findByEmail(String email);
}
