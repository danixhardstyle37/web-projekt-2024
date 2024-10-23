package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Duljina;
import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.repositories.DuljinaRepo;
import com.example.tartufibackend.repositories.KorisnikRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DuljinaService {
    @Autowired
    private DuljinaRepo duljinaRepo;

    public List<Duljina> findAll() { return duljinaRepo.findAll(); }
    public Duljina findById(Integer id) { return duljinaRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { duljinaRepo.deleteById(id); }
    public Duljina save(Duljina duljina) { return duljinaRepo.save(duljina); }
    public Optional<Duljina> updateById(Integer id) { return duljinaRepo.findById(id); }

}
