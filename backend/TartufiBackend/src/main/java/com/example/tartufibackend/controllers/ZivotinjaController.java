package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Korisnik;
import com.example.tartufibackend.models.Zivotinja;
import com.example.tartufibackend.repositories.KorisnikRepo;
import com.example.tartufibackend.repositories.ZivotinjaRepo;
import com.example.tartufibackend.services.ZivotinjaService;
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
public class ZivotinjaController {
    @Autowired
    private ZivotinjaService zivotinjaService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/zivotinje")
    public List<Zivotinja> getZivotinje() {
        return zivotinjaService.findAll();
    }

    @GetMapping(value = "/zivotinje/{id}")
    public Zivotinja getZivotinjaById(@PathVariable Integer id) {
        return zivotinjaService.findById(id);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/zivotinje", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Zivotinja> addZivotinja(@RequestBody Zivotinja zivotinja) {
        if (zivotinja == null) {
            return ResponseEntity.badRequest().build(); // Ensure zivotinja is not null
        }
        Zivotinja savedZivotinja = zivotinjaService.save(zivotinja);
        return ResponseEntity.ok(savedZivotinja);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/zivotinje/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Zivotinja> updateZivotinja(@PathVariable Integer id, @RequestBody Zivotinja updatedZivotinja) {
        Optional<Zivotinja> existingZivotinja = zivotinjaService.updateById(id);

        if (existingZivotinja.isPresent()) {
            Zivotinja zivotinja = existingZivotinja.get();
            // Update fields
            zivotinja.setVrsta(updatedZivotinja.getVrsta());
            zivotinja.setIme(updatedZivotinja.getIme());
            zivotinja.setOpis(updatedZivotinja.getOpis());

            Zivotinja savedZivotinja = zivotinjaService.save(zivotinja);  // `save()` will perform the update
            return ResponseEntity.ok(savedZivotinja);  // Return the updated Zivotinja
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/zivotinje/{id}")
    public ResponseEntity<Void> deleteZivotinja(@PathVariable Integer id) {
        try {
            zivotinjaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
