package com.bookreview.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookreview.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByBookId(UUID bookId);
    List<Review> findByUserId(UUID userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") UUID bookId);
    
    boolean existsByBookIdAndUserId(UUID bookId, UUID userId);
}