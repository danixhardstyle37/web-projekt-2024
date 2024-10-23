package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Merch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MerchRepo extends JpaRepository<Merch,Integer> {
}
