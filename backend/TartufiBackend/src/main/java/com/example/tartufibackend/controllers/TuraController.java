package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.TuraRepo;
import com.example.tartufibackend.services.TuraService;
import jakarta.persistence.criteria.CriteriaBuilder;
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
public class TuraController {
    @Autowired
    private TuraService turaService;

    // GET metode (prikaži sve ili po id)

    @GetMapping(value = "/ture")
    public List<Tura> getTure(){ return turaService.findAll(); }

    @GetMapping(value = "/ture/{id}")
    public Tura getTuraById(@PathVariable Integer id) { return turaService.findById(id); }

    // POST metoda (dodaj novo)

    @PostMapping(value = "/ture", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Tura> addTura(@RequestBody Tura tura) {
        System.out.println(tura.toString());
        if (tura == null) {
            return ResponseEntity.badRequest().build(); // Ensure tura is not null
        }
        Tura savedTura = turaService.save(tura);
        return ResponseEntity.ok(savedTura);
    }

    // PUT metoda (ažuriraj)

    @PutMapping(value = "/ture/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Tura> updateTura(@PathVariable Integer id, @RequestBody Tura updatedTura) {
        Optional<Tura> existingTura = turaService.updateById(id);

        if (existingTura.isPresent()) {
            Tura tura = existingTura.get();
            // Update fields
            tura.setIme(updatedTura.getIme());
            tura.setOpis(updatedTura.getOpis());
            tura.setDuljina(updatedTura.getDuljina());

            Tura savedTura = turaService.save(tura);  // `save()` will perform the update
            return ResponseEntity.ok(savedTura);  // Return the updated Tura
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)

    @DeleteMapping(value = "/ture/{id}")
    public ResponseEntity<Void> deleteTura(@PathVariable Integer id) {
        try {
            turaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }



}
