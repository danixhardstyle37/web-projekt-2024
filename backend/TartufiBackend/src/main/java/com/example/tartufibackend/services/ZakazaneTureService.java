package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.ZakazaneTure;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.ZakazaneTureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZakazaneTureService {
    @Autowired
    private ZakazaneTureRepo zakazaneTureRepo;

    public List<ZakazaneTure> findAll() { return zakazaneTureRepo.findAll(); }
    public ZakazaneTure findById(Integer id) { return zakazaneTureRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { zakazaneTureRepo.deleteById(id); }
    public ZakazaneTure save(ZakazaneTure zakazanaTura) { return zakazaneTureRepo.save(zakazanaTura); }
    public Optional<ZakazaneTure> updateById(Integer id) { return zakazaneTureRepo.findById(id); }

}
