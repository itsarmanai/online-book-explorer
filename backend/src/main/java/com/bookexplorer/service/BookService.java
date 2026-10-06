package com.bookexplorer.repository;

import com.bookexplorer.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByCategoryIgnoreCase(String category);

    List<Book> findByBookNameContainingIgnoreCase(String keyword);

    List<Book> findByAuthorNameContainingIgnoreCase(String keyword);

    List<Book> findByCategoryIgnoreCaseAndBookNameContainingIgnoreCase(String category, String keyword);
}
