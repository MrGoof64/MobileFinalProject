package org.example.libraryapi.controller;

import org.example.libraryapi.models.Book;
import org.example.libraryapi.repository.LibraryRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "*")   if needed
@RestController
public class LibraryController {
    private final LibraryRepository libraryRepository;

    public LibraryController(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @GetMapping("/")
    public List<Book> getAllBooks() {
        return libraryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return libraryRepository.findById(id).orElse(null);
    }
}
