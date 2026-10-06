package com.bookexplorer.service;

import com.bookexplorer.dto.BookDTO;
import com.bookexplorer.model.Book;
import com.bookexplorer.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<BookDTO> getAllBooks() {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public BookDTO getBookById(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public BookDTO createBook(BookDTO bookDTO) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public void deleteBook(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public List<BookDTO> getBooksByCategory(String category) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public List<BookDTO> searchBooks(String keyword) {
        throw new UnsupportedOperationException("Not implemented yet");
    }
}
