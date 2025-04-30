package com.bookreview.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookreview.config.JwtProvider;
import com.bookreview.config.UserPrincipal;
import com.bookreview.dto.JwtAuthResponse;
import com.bookreview.dto.LoginDto;
import com.bookreview.dto.RegisterDto;
import com.bookreview.entity.User;
import com.bookreview.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtProvider jwtProvider, 
                         UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

  
    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
    if (userRepository.existsByEmail(registerDto.getEmail())) {
        return ResponseEntity.badRequest().body("Email is already taken!");
    }

    String role = registerDto.getRole();
    if (role == null || (!role.equals("USER") && !role.equals("ADMIN"))) {
        return ResponseEntity.badRequest().body("Role must be either USER or ADMIN");
    }

    User user = new User();
    user.setName(registerDto.getName());
    user.setEmail(registerDto.getEmail());
    user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
    user.setRole(role); 
    
    userRepository.save(user);
    
    return ResponseEntity.ok("User registered successfully");
}


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        
        User user = userRepository.findByEmail(loginDto.getEmail())
                          .orElseThrow(() -> new RuntimeException("User not found with email: " + loginDto.getEmail()));

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(user, jwt);

        return ResponseEntity.ok(jwtAuthResponse);
    }



     @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        User user = userPrincipal.getUser();
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("password", (user.getPassword()));
        response.put("role", user.getRole());
        return ResponseEntity.ok(response);
    }

}