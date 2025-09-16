package com.dailycodework.sbrdemo.repository;


import com.dailycodework.sbrdemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    User findByUsername(String username); // Find a user by username
}