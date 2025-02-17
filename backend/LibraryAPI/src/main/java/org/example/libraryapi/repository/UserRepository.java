package org.example.libraryapi.repository;

import org.example.libraryapi.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

// This repository is for interacting with the User model
// and users.json file
public interface UserRepository extends MongoRepository<User, String> {
    // This allows you to find a user by their name
    Optional<User> findByUserName(String name);
}
