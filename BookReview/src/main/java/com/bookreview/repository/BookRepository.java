package com.bookreview.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookreview.entity.Book;

public interface BookRepository extends JpaRepository<Book, UUID> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByGenre(String genre);


     @Query("SELECT DISTINCT b FROM Book b JOIN b.reviews r WHERE r.rating = :rating")
    List<Book> findByRating(@Param("rating") int rating);
}