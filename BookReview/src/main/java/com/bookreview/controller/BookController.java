package com.bookreview.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookreview.entity.Book;
import com.bookreview.repository.BookRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/user/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable UUID id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String genre) {
        
        if (title != null) {
            return ResponseEntity.ok(bookRepository.findByTitleContainingIgnoreCase(title));
        } else if (author != null) {
            return ResponseEntity.ok(bookRepository.findByAuthorContainingIgnoreCase(author));
        } else if (genre != null) {
            return ResponseEntity.ok(bookRepository.findByGenre(genre));
        } else {
            return ResponseEntity.ok(bookRepository.findAll());
        }
    }
    @GetMapping("/filter/{rating}")
public ResponseEntity<List<Book>> getBooksByRating(@PathVariable int rating) {
if (rating < 1 || rating > 5) {
return ResponseEntity.badRequest().build();
}
List<Book> books = bookRepository.findByRating(rating);
return ResponseEntity.ok(books);
}

}