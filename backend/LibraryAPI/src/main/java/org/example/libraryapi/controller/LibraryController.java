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

    @GetMapping("/name/{name}")
    public List<Book> getBooksByName(@PathVariable String name) {
        return libraryRepository.findByName(name);
    }

    @GetMapping("/genre/{genre}")
    public List<Book> getBooksByGenre(@PathVariable String genre) {
        return libraryRepository.findByGenre(genre);
    }

    // User Functions

    // Returns all the users from users.json
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Returns a specific user based on their id
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }

    // Returns a specific user based on their name. Better than grabbing the id
    // because the name never changes
    @GetMapping("/user/{userName}")
    public Optional<User> getUserByName(@PathVariable String userName) {
        return userRepository.findByUserName(userName);
    }

    // Takes a user based on their name, then adds a book based on its id to that
    // users checkedOutBooks list. I used the book's id because that's what is passed
    // between pages on the front end.
    @PostMapping("/users/{userName}/userCheckout/{id}")
    public User checkoutBook(@PathVariable String userName, @PathVariable String id) {
        return userRepository.findByUserName(userName).map(user -> {
            if (!user.getCheckedOutBooks().contains(id)) {
                user.getCheckedOutBooks().add(id);
                return userRepository.save(user);
            }
            return user;
        }).orElse(null);
    }

    // Similar to the checkoutBook function, but instead removes the specified
    // book from the user's checkedOutBooks list
    @PutMapping("/users/{userName}/userReturn/{bookId}")
    public ResponseEntity<?> returnBook(@PathVariable String userName, @PathVariable String bookId) {
        Optional<User> optionalUser = userRepository.findByUserName(userName);

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