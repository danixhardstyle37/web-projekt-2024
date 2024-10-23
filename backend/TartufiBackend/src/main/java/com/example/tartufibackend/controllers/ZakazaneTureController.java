package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.Merch;
import com.example.tartufibackend.models.ZakazaneTure;
import com.example.tartufibackend.repositories.MerchRepo;
import com.example.tartufibackend.repositories.ZakazaneTureRepo;
import com.example.tartufibackend.services.ZakazaneTureService;
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
public class ZakazaneTureController {
    @Autowired
    private ZakazaneTureService zakazaneTureService;

    // GET metode (prikaži sve ili po id)
    @GetMapping(value = "/zakazane_ture")
    public List<ZakazaneTure> getZakazaneTure() {
        return zakazaneTureService.findAll();
    }

    @GetMapping(value = "/zakazane_ture/{id}")
    public ZakazaneTure getZakazanaTuraById(@PathVariable Integer id) {
        return zakazaneTureService.findById(id);
    }

    // POST metoda (dodaj novo)
    @PostMapping(value = "/zakazane_ture", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ZakazaneTure> addZakazanaTura(@RequestBody ZakazaneTure zakazanaTura) {
        if (zakazanaTura == null) {
            return ResponseEntity.badRequest().build(); // Ensure zakazanaTura is not null
        }
        ZakazaneTure savedZakazanaTura = zakazaneTureService.save(zakazanaTura);
        return ResponseEntity.ok(savedZakazanaTura);
    }

    // PUT metoda (ažuriraj)
    @PutMapping(value = "/zakazane_ture/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ZakazaneTure> updateZakazanaTura(@PathVariable Integer id, @RequestBody ZakazaneTure updatedZakazanaTura) {
        Optional<ZakazaneTure> existingZakazanaTura = zakazaneTureService.updateById(id);

        if (existingZakazanaTura.isPresent()) {
            ZakazaneTure zakazanaTura = existingZakazanaTura.get();
            // Update fields
            zakazanaTura.setDateTime_Od(updatedZakazanaTura.getDateTime_Od());
            zakazanaTura.setDateTime_Do(updatedZakazanaTura.getDateTime_Do());
            zakazanaTura.setKorisnik(updatedZakazanaTura.getKorisnik());
            zakazanaTura.setTura(updatedZakazanaTura.getTura());

            ZakazaneTure savedZakazanaTura = zakazaneTureService.save(zakazanaTura);  // `save()` will perform the update
            return ResponseEntity.ok(savedZakazanaTura);  // Return the updated ZakazanaTura
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }
    }

    // DELETE metoda (izbriši po id)
    @DeleteMapping(value = "/zakazaneTure/{id}")
    public ResponseEntity<Void> deleteZakazanaTura(@PathVariable Integer id) {
        try {
            zakazaneTureService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
