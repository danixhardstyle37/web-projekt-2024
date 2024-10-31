package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.repositories.KorisnikRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikService {

    @Autowired
    private KorisnikRepo korisnikRepo;

    public List<Korisnik> findAll() { return korisnikRepo.findAll(); }
    public Korisnik findById(Integer id) { return korisnikRepo.findById(id).orElse(null); }
    public Korisnik findByUsername(String username) { return korisnikRepo.findByUsername(username).orElse(null); }
    public Korisnik findByEmail(String email) { return korisnikRepo.findByEmail(email).orElse(null); }
    public void deleteById(Integer id) { korisnikRepo.deleteById(id); }
    public Korisnik save(Korisnik korisnik) { return korisnikRepo.save(korisnik); }
    public Optional<Korisnik> updateById(Integer id) { return korisnikRepo.findById(id); }

}
