package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Duljina;
import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.DuljinaRepo;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.services.DuljinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class DuljinaController {
    @Autowired
    private DuljinaService duljinaService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/duljine")
    public List<Duljina> getDuljine() {
        return duljinaService.findAll();
    }

    @GetMapping(value = "/duljine/{id}")
    public Duljina getDuljinaById(@PathVariable Integer id) {
        return duljinaService.findById(id);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/duljine", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Duljina> addDuljina(@RequestBody Duljina duljina) {
        if (duljina == null) {
            return ResponseEntity.badRequest().build(); // Ensure duljina is not null
        }
        Duljina savedDuljina = duljinaService.save(duljina);
        return ResponseEntity.ok(savedDuljina);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/duljine/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Duljina> updateDuljina(@PathVariable Integer id, @RequestBody Duljina updatedDuljina) {
        Optional<Duljina> existingDuljina = duljinaService.updateById(id);

        if (existingDuljina.isPresent()) {
            Duljina duljina = existingDuljina.get();
            // Update fields
            duljina.setDuljina(updatedDuljina.getDuljina());
            duljina.setCijena(updatedDuljina.getCijena());

            Duljina savedDuljina = duljinaService.save(duljina);  // `save()` will perform the update
            return ResponseEntity.ok(savedDuljina);  // Return the updated Duljina
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/duljine/{id}")
    public ResponseEntity<Void> deleteDuljina(@PathVariable Integer id) {
        try {
            duljinaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
