package com.bookexplorer.service;

import com.bookexplorer.dto.BookDTO;

import java.util.List;

public interface BookService {
    List<BookDTO> getAllBooks();
    BookDTO getBookById(Long id);
    BookDTO createBook(BookDTO bookDTO);
    BookDTO updateBook(Long id, BookDTO bookDTO);
    void deleteBook(Long id);
    List<BookDTO> getBooksByCategory(String category);
    List<BookDTO> searchBooks(String keyword);
}
