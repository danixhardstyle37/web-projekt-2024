package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Tura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TuraRepo extends JpaRepository<Tura,Integer> {
}
