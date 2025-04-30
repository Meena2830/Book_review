package com.bookreview.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookreview.entity.User;

public interface  UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByName(String name);
}
