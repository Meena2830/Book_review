package com.bookreview.dto;
import java.time.LocalDateTime;
import java.util.UUID;

public class ReviewResponse {
    private UUID id;
    private UUID bookId;
    private UUID userId;
    private String userName;
    private Integer rating;
    private String reviewText;
    private LocalDateTime createdAt;

    
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getBookId() {
        return bookId;
    }
    public void setBookId(UUID bookId) {
        this.bookId = bookId;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public Integer getRating() {
        return rating;
    }
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    public String getReviewText() {
        return reviewText;
    }
    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
}