package com.taskMate.TaskMate.service.impl;

import com.taskMate.TaskMate.dto.AuthResponse;
import com.taskMate.TaskMate.dto.LoginRequest;
import com.taskMate.TaskMate.dto.RegisterRequestDto;
import com.taskMate.TaskMate.model.User;
import com.taskMate.TaskMate.repository.UserRepository;
import com.taskMate.TaskMate.service.JwtService;
import com.taskMate.TaskMate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.email()))
            throw new RuntimeException("Email already registered");

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        String token = null;
        try {
            token = jwtService.generateToken(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new AuthResponse(token, user.getUsername());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword()))
            throw new BadCredentialsException("Invalid credentials");

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUsername());
    }
}
