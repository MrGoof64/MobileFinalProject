package org.example.libraryapi.controller;

import org.example.libraryapi.models.Book;
import org.example.libraryapi.models.User;
import org.example.libraryapi.repository.LibraryRepository;
import org.example.libraryapi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RequestMapping("/book")
@RestController
public class LibraryController {
    private final LibraryRepository libraryRepository;
    private final UserRepository userRepository;

    public LibraryController(LibraryRepository libraryRepository, UserRepository userRepository) {
        this.libraryRepository = libraryRepository;
        this.userRepository = userRepository;
    }

    // Book Functions
    @GetMapping("/start")
    public List<Book> getAllBooks() {
        return libraryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return libraryRepository.findById(id).orElse(null);
    }


    // User Functions
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/users/{userId}/userCheckout/{bookId}")
    public User checkoutBook(@PathVariable String userId, @PathVariable String bookId) {
        return userRepository.findById(userId).map(user -> {
            if (!user.getCheckedOutBooks().contains(bookId)) {
                user.getCheckedOutBooks().add(bookId);
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

    @PutMapping("/users/{userId}/userReturn/{bookId}")
    public ResponseEntity<?> returnBook(@PathVariable String userId, @PathVariable String bookId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        if (!user.getCheckedOutBooks().contains(bookId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book not found in user's list");
        }

        user.getCheckedOutBooks().remove(bookId);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}
