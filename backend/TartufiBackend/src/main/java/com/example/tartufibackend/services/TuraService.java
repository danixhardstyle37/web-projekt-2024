package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.TuraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TuraService {
    @Autowired
    private TuraRepo turaRepo;

    public List<Tura> findAll(){ return turaRepo.findAll(); }
    public Tura findById(Integer id) {return turaRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { turaRepo.deleteById(id); }
    public Tura save(Tura tura) { return turaRepo.save(tura); }
    public Optional<Tura> updateById(Integer id) { return turaRepo.findById(id); }
}
