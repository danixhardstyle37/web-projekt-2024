package com.example.tartufibackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;

@RestController
public class KorisnikController implements Serializable {

    @Autowired
    private KorisnikRepo korisnikRepo;

    @GetMapping(value = "/korisnici")
    public List<Korisnik> getKorisnike(){
        return korisnikRepo.findAll();
    }
}
