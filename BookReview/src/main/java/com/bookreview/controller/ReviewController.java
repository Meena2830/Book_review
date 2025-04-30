package com.bookreview.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookreview.dto.ReviewRequest;
import com.bookreview.dto.ReviewResponse;
import com.bookreview.entity.Book;
import com.bookreview.repository.BookRepository;
import com.bookreview.service.ReviewService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/user/books/{bookId}/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    private final BookRepository bookRepository;

    public ReviewController(ReviewService reviewService, BookRepository bookRepository) {
        this.reviewService = reviewService;
        this.bookRepository = bookRepository;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable UUID bookId,
            @Validated @RequestBody ReviewRequest reviewRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        ReviewResponse response = reviewService.createReview(bookId, reviewRequest, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getBookReviews(@PathVariable UUID bookId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByBookId(bookId);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable UUID bookId,
            @PathVariable UUID reviewId,
            @Validated @RequestBody ReviewRequest reviewRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        ReviewResponse response = reviewService.updateReview(reviewId, reviewRequest, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable UUID reviewId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        reviewService.deleteReview(reviewId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }


    

}
