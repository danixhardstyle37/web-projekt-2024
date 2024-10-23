package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Zivotinja;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZivotinjaRepo extends JpaRepository<Zivotinja,Integer> {
}
