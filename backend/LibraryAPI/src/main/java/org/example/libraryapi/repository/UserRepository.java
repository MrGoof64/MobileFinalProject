package org.example.libraryapi.repository;

import org.example.libraryapi.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserName(String name);
}
