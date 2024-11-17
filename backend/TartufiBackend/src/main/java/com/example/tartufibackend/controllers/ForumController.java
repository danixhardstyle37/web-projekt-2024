package com.example.tartufibackend.controllers;


import com.example.tartufibackend.exceptions.ResponseMessage;
import com.example.tartufibackend.models.Forum;
import com.example.tartufibackend.services.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ForumController {

    @Autowired
    private ForumService forumService;


    // GET methods (get all or by id)
    @GetMapping(value = "/forums")
    public List<Forum> getForums() {
        return forumService.findAll();
    }

    @GetMapping(value = "/forums/{id}")
    public Forum getForumById(@PathVariable Integer id) {
        return forumService.findById(id);
    }

    // POST method (add new)
    @PostMapping(value = "/forums", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Forum> addForum(@RequestBody Forum forum) {
        if (forum == null) {
            return ResponseEntity.badRequest().build();
        }
        Forum savedForum = forumService.save(forum);
        return ResponseEntity.ok(savedForum);
    }

    // PUT method (update)
    @PutMapping(value = "/forums/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Forum> updateForum(@PathVariable Integer id, @RequestBody Forum updatedForum) {
        Optional<Forum> existingForum = forumService.updateById(id);

        if (existingForum.isPresent()) {
            Forum forum = existingForum.get();
            // Update fields
            forum.setKorisnik(updatedForum.getKorisnik());
            forum.setMessage(updatedForum.getMessage());
            forum.setAnimal(updatedForum.getAnimal());
            forum.setImgPth(updatedForum.getImgPth());

            Forum savedForum = forumService.save(forum);
            return ResponseEntity.ok(savedForum);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE method (delete by id)
    @DeleteMapping(value = "/forums/{id}")
    public ResponseEntity<Void> deleteForum(@PathVariable Integer id) {
        try {
            forumService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/image")
    public ResponseEntity<ResponseMessage> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("fileNum") int fileNum) {
        String result = forumService.saveImage(file, fileNum);

        if (result.startsWith("Failed")) {
            return ResponseEntity.status(500).body(new ResponseMessage(result));
        }

        return ResponseEntity.ok(new ResponseMessage("File uploaded successfully", result));
    }


}

