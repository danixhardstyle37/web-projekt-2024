package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.ZakazaneTure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZakazaneTureRepo extends JpaRepository<ZakazaneTure,Integer> {
}
