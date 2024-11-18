package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Forum;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.ForumRepo;
import com.example.tartufibackend.repositories.TuraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ForumService {
    @Autowired
    private ForumRepo forumRepo;


    public List<Forum> findAll(){ return forumRepo.findAll(); }
    public Forum findById(Integer id) {return forumRepo.findById(id).orElse(null); }
    public void deleteById(Integer id) { forumRepo.deleteById(id); }
    public Forum save(Forum forum) { return forumRepo.save(forum); }
    public Optional<Forum> updateById(Integer id) { return forumRepo.findById(id); }

    public String saveImage(MultipartFile file, int fileNum) {
        if (file.isEmpty()) {
            return "File is empty.";
        }

        String projectRoot = System.getProperty("user.dir");



        // Construct a relative path based on the project root
        String uploadDir = projectRoot.replace("\\backend\\TartufiBackend", "");
        uploadDir = uploadDir + "\\frontend\\imgs\\reviews\\";

        try {
            // Generate the new file name based on fileNum (e.g., review1.jpg)
            String fileName = "review" + fileNum + ".jpg";  // Modify this if you need another file extension or format

            // Define the path where you want to store the file
            Path targetLocation = Paths.get(uploadDir + fileName);

            // Ensure the directory exists
            Files.createDirectories(targetLocation.getParent());

            // Save the file using the generated name, NOT using the original file name
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);  // Ensure to overwrite if file exists

            // Return the new file name as the result
            return fileName;
        } catch (IOException e) {
            return "Failed to store file: " + e.getMessage();  // Return an error message if something goes wrong
        }
    }



}
