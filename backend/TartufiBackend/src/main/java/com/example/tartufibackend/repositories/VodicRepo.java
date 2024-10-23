package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Vodic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VodicRepo extends JpaRepository<Vodic,Integer> {
}
