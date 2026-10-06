package com.bookexplorer.controller;

import com.bookexplorer.dto.BookDTO;
import com.bookexplorer.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return new ResponseEntity<>(List.of(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDTO) {
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @Valid @RequestBody BookDTO bookDTO) {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<BookDTO>> getBooksByCategory(@PathVariable String category) {
        return new ResponseEntity<>(List.of(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDTO>> searchBooks(@RequestParam String keyword) {
        return new ResponseEntity<>(List.of(), HttpStatus.OK);
    }
}
