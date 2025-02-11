package org.example.libraryapi.repository;

import org.example.libraryapi.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUserName(String name);
}
