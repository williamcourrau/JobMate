package com.taskMate.TaskMate.service;

import com.taskMate.TaskMate.dto.AuthResponse;
import com.taskMate.TaskMate.dto.LoginRequest;
import com.taskMate.TaskMate.dto.RegisterRequestDto;

public interface UserService {
    AuthResponse register(RegisterRequestDto requestDto);
    AuthResponse login(LoginRequest loginRequest);
}
