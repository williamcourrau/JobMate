package com.taskMate.TaskMate.controller;

import com.taskMate.TaskMate.dto.AuthResponse;
import com.taskMate.TaskMate.dto.LoginRequest;
import com.taskMate.TaskMate.dto.RegisterRequestDto;
import com.taskMate.TaskMate.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequestDto requestDto){
        return ResponseEntity.ok(userService.register(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(userService.login(request));
    }
}
