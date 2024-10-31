package com.example.tartufibackend.controllers;

import com.example.tartufibackend.models.TokenGenerator;
import com.example.tartufibackend.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TokenController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/generateToken")
    public String generateToken(@RequestParam String email) {
        // Generate a random token
        String token = TokenGenerator.generateRandomToken();

        // Send the token via email
        emailService.sendEmail(email, token);

        return "Token sent to " + email;
    }
}