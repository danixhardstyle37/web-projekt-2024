package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Merch;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.MerchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MerchService {
    @Autowired
    private MerchRepo merchRepo;

    public List<Merch> findAll() { return merchRepo.findAll(); }
    public Merch findById(Integer id) { return merchRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { merchRepo.deleteById(id); }
    public Merch save(Merch merch) { return merchRepo.save(merch); }
    public Optional<Merch> updateById(Integer id) { return merchRepo.findById(id); }

}
