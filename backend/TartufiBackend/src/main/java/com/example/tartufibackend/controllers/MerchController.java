package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Merch;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.MerchRepo;
import com.example.tartufibackend.services.MerchService;
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
public class MerchController {
    @Autowired
    private MerchService merchService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/merch")
    public List<Merch> getMerch() {
        return merchService.findAll();
    }

    @GetMapping(value = "/merch/{id}")
    public Merch getMerchById(@PathVariable Integer id) {
        return merchService.findById(id);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/merch", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Merch> addMerch(@RequestBody Merch merch) {
        if (merch == null) {
            return ResponseEntity.badRequest().build(); // Ensure merch is not null
        }
        Merch savedMerch = merchService.save(merch);
        return ResponseEntity.ok(savedMerch);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/merch/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Merch> updateMerch(@PathVariable Integer id, @RequestBody Merch updatedMerch) {
        Optional<Merch> existingMerch = merchService.updateById(id);

        if (existingMerch.isPresent()) {
            Merch merch = existingMerch.get();
            // Update fields
            merch.setTip(updatedMerch.getTip());
            merch.setCijena(updatedMerch.getCijena());
            merch.setOpis(updatedMerch.getOpis());

            Merch savedMerch = merchService.save(merch);  // `save()` will perform the update
            return ResponseEntity.ok(savedMerch);  // Return the updated Merch
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/merch/{id}")
    public ResponseEntity<Void> deleteMerch(@PathVariable Integer id) {
        try {
            merchService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
