package com.example.tartufibackend.services;

import com.example.tartufibackend.models.Forum;
import com.example.tartufibackend.models.Tura;
import com.example.tartufibackend.repositories.ForumRepo;
import com.example.tartufibackend.repositories.TuraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
