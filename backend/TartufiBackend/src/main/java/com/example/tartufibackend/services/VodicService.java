package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Vodic;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.VodicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VodicService {
    @Autowired
    private VodicRepo vodicRepo;

    public List<Vodic> findAll() { return vodicRepo.findAll(); }
    public Vodic findById(Integer id) { return vodicRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { vodicRepo.deleteById(id); }
    public Vodic save(Vodic vodic) { return vodicRepo.save(vodic); }
    public Optional<Vodic> updateById(Integer id) { return vodicRepo.findById(id); }

}
