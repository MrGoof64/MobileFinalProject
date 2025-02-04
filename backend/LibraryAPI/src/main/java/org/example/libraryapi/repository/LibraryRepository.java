package org.example.libraryapi.repository;

import org.example.libraryapi.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LibraryRepository extends MongoRepository<Book, String> { }
