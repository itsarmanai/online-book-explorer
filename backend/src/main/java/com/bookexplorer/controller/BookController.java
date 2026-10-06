package com.bookexplorer.service;

import com.bookexplorer.dto.BookDTO;
import com.bookexplorer.exception.BookNotFoundException;
import com.bookexplorer.model.Book;
import com.bookexplorer.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<BookDTO> getAllBooks() {
        List<BookDTO> books = new ArrayList<>();
        for (Book book : bookRepository.findAll()) {
            books.add(convertToDto(book));
        }
        return books;
    }

    @Override
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));
        return convertToDto(book);
    }

    @Override
    public BookDTO createBook(BookDTO dto) {
        Book book = convertToEntity(dto);
        Book saved = bookRepository.save(book);
        return convertToDto(saved);
    }

    @Override
    public BookDTO updateBook(Long id, BookDTO dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));

        book.setBookName(dto.getBookName());
        book.setAuthorName(dto.getAuthorName());
        book.setIsbn(dto.getIsbn());
        book.setCategory(dto.getCategory());
        book.setPrice(dto.getPrice());
        book.setDescription(dto.getDescription());
        book.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        book.setImageUrl(dto.getImageUrl());

        Book updated = bookRepository.save(book);
        return convertToDto(updated);
    }

    @Override
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    @Override
    public List<BookDTO> getBooksByCategory(String category) {
        List<BookDTO> books = new ArrayList<>();
        for (Book book : bookRepository.findByCategoryIgnoreCase(category)) {
            books.add(convertToDto(book));
        }
        return books;
    }

    @Override
    public List<BookDTO> searchBooks(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllBooks();
        }

        String key = keyword.trim();
        List<Book> result = new ArrayList<>();
        result.addAll(bookRepository.findByBookNameContainingIgnoreCase(key));
        result.addAll(bookRepository.findByAuthorNameContainingIgnoreCase(key));

        List<BookDTO> dtoList = new ArrayList<>();
        for (Book book : result.stream().distinct().toList()) {
            dtoList.add(convertToDto(book));
        }
        return dtoList;
    }

    private BookDTO convertToDto(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setBookName(book.getBookName());
        dto.setAuthorName(book.getAuthorName());
        dto.setIsbn(book.getIsbn());
        dto.setCategory(book.getCategory());
        dto.setPrice(book.getPrice());
        dto.setDescription(book.getDescription());
        dto.setAvailable(book.getAvailable());
        dto.setImageUrl(book.getImageUrl());
        return dto;
    }

    private Book convertToEntity(BookDTO dto) {
        Book book = new Book();
        book.setBookName(dto.getBookName());
        book.setAuthorName(dto.getAuthorName());
        book.setIsbn(dto.getIsbn());
        book.setCategory(dto.getCategory());
        book.setPrice(dto.getPrice());
        book.setDescription(dto.getDescription());
        book.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        book.setImageUrl(dto.getImageUrl());
        return book;
    }
}
