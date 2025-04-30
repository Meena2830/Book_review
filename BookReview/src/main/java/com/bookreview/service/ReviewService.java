package com.bookreview.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bookreview.dto.ReviewRequest;
import com.bookreview.dto.ReviewResponse;
import com.bookreview.entity.Book;
import com.bookreview.entity.Review;
import com.bookreview.entity.User;
import com.bookreview.exception.ResourceNotFoundException;
import com.bookreview.exception.UnauthorizedException;
import com.bookreview.repository.BookRepository;
import com.bookreview.repository.ReviewRepository;
import com.bookreview.repository.UserRepository;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    

    public ReviewService(ReviewRepository reviewRepository, BookRepository bookRepository,
            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public ReviewResponse createReview(UUID bookId, ReviewRequest request, String userEmail) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (reviewRepository.existsByBookIdAndUserId(bookId, user.getId())) {
            throw new IllegalStateException("You have already reviewed this book");
        }

        Review review = new Review();
        review.setBook(book);
        review.setUser(user);
        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());
        
        Review savedReview = reviewRepository.save(review);
        return mapToResponse(savedReview);
    }

    public List<ReviewResponse> getReviewsByBookId(UUID bookId) {
        return reviewRepository.findByBookId(bookId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReviewResponse updateReview(UUID reviewId, ReviewRequest request, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        
        if (!review.getUser().getEmail().equals(userEmail)) {
            throw new UnauthorizedException("You can only update your own reviews");
        }

        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());
        
        Review updatedReview = reviewRepository.save(review);
        return mapToResponse(updatedReview);
    }

    public void deleteReview(UUID reviewId, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        
        if (!review.getUser().getEmail().equals(userEmail)) {
            throw new UnauthorizedException("You can only delete your own reviews");
        }

        reviewRepository.delete(review);
    }

    private ReviewResponse mapToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setBookId(review.getBook().getId());
        response.setUserId(review.getUser().getId());
        response.setUserName(review.getUser().getName());
        response.setRating(review.getRating());
        response.setReviewText(review.getReviewText());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}
