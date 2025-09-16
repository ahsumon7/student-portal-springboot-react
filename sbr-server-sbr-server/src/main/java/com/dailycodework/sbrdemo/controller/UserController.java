package com.dailycodework.sbrdemo.controller;

import com.dailycodework.sbrdemo.model.User;
import com.dailycodework.sbrdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")  // Allow CORS for this endpoint only
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);
        if (result.equals("User registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")  // Allow CORS for this endpoint only
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        String result = userService.authenticate(user.getUsername(), user.getPassword());
        if (result.equals("Login successful!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}
