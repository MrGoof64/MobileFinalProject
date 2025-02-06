package org.example.libraryapi.controller;

import org.example.libraryapi.models.Book;
import org.example.libraryapi.repository.LibraryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/book")
@RestController
public class LibraryController {
    private final LibraryRepository libraryRepository;

    public LibraryController(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    @GetMapping("/start")
    public List<Book> getAllBooks() {
        return libraryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return libraryRepository.findById(id).orElse(null);
    }
}
