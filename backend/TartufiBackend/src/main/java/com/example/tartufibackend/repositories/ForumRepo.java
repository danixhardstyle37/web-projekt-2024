package com.example.tartufibackend.repositories;

import com.example.tartufibackend.models.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepo extends JpaRepository<Forum, Integer> {
}
