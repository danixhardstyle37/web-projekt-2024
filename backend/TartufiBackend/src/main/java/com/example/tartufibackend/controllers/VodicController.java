package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Vodic;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.VodicRepo;
import com.example.tartufibackend.services.VodicService;
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
public class VodicController {
    @Autowired
    private VodicService vodicService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/vodici")
    public List<Vodic> getVodici() {
        return vodicService.findAll();
    }

    @GetMapping(value = "/vodici/{id}")
    public Vodic getVodicById(@PathVariable Integer id) {
        return vodicService.findById(id);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/vodici", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Vodic> addVodic(@RequestBody Vodic vodic) {
        if (vodic == null) {
            return ResponseEntity.badRequest().build(); // Ensure vodic is not null
        }
        Vodic savedVodic = vodicService.save(vodic);
        return ResponseEntity.ok(savedVodic);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/vodici/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Vodic> updateVodic(@PathVariable Integer id, @RequestBody Vodic updatedVodic) {
        Optional<Vodic> existingVodic = vodicService.updateById(id);

        if (existingVodic.isPresent()) {
            Vodic vodic = existingVodic.get();
            // Update fields
            vodic.setImePrezime(updatedVodic.getImePrezime());
            vodic.setBrojTura(updatedVodic.getBrojTura());
            vodic.setBroj_telefona(updatedVodic.getBroj_telefona());

            Vodic savedVodic = vodicService.save(vodic);  // `save()` will perform the update
            return ResponseEntity.ok(savedVodic);  // Return the updated Vodic
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/vodici/{id}")
    public ResponseEntity<Void> deleteVodic(@PathVariable Integer id) {
        try {
            vodicService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
