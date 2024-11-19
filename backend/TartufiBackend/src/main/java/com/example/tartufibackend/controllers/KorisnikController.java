package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.services.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/korisnici")
    public List<Korisnik> getKorisnici() {
        return korisnikService.findAll();
    }

    @GetMapping(value = "/korisnici/{id}")
    public Korisnik getKorisnikById(@PathVariable Integer id) {
        return korisnikService.findById(id);
    }

    @GetMapping(value = "/korisnici/username/{username}")
    public Korisnik getKorisnikByUsername(@PathVariable String username) {
        return korisnikService.findByUsername(username);
    }

    @GetMapping(value = "/korisnici/email/{email}")
    public Korisnik getKorisnikByEmail(@PathVariable String email) {
        return korisnikService.findByEmail(email);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/korisnici", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Korisnik> addKorisnik(@RequestBody Korisnik korisnik) {
        if (korisnik == null) {
            return ResponseEntity.badRequest().build();
        }
        Korisnik savedKorisnik = korisnikService.save(korisnik);
        return ResponseEntity.ok(savedKorisnik);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/korisnici/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Korisnik> updateKorisnik(@PathVariable Integer id, @RequestBody Korisnik updatedKorisnik) {
        Optional<Korisnik> existingKorisnik = korisnikService.updateById(id);

        if (existingKorisnik.isPresent()) {
            Korisnik korisnik = existingKorisnik.get();
            korisnik.setUsername(updatedKorisnik.getUsername());
            korisnik.setIme_prezime(updatedKorisnik.getIme_prezime());
            korisnik.setEmail(updatedKorisnik.getEmail());

            Korisnik savedKorisnik = korisnikService.save(korisnik);
            return ResponseEntity.ok(savedKorisnik);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/korisnici/{id}")
    public ResponseEntity<Void> deleteKorisnik(@PathVariable Integer id) {
        try {
            korisnikService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

