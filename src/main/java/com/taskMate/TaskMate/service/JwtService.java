package com.taskMate.TaskMate.service;

import com.taskMate.TaskMate.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String generateToken(User user);
    String extractUserName(String token);
    Boolean isTokenValid(String token, UserDetails userDetails);
}
