package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Zivotinja;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.ZivotinjaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZivotinjaService {
    @Autowired
    private ZivotinjaRepo zivotinjaRepo;

    public List<Zivotinja> findAll() { return zivotinjaRepo.findAll(); }
    public Zivotinja findById(Integer id) { return zivotinjaRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { zivotinjaRepo.deleteById(id); }
    public Zivotinja save(Zivotinja zivotinja) { return zivotinjaRepo.save(zivotinja); }
    public Optional<Zivotinja> updateById(Integer id) { return zivotinjaRepo.findById(id); }

}
