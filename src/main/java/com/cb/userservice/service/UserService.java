package com.cb.userservice.service;

import com.cb.userservice.model.RegisterUserRequest;
import com.cb.userservice.model.User;
import com.cb.userservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterUserRequest request) {
        String userId = UUID.randomUUID().toString();
        User user = User.of(userId, request.getName(), request.getEmail());
        userRepository.save(user);
        log.info("{\"action\":\"register\",\"userId\":\"{}\",\"email\":\"{}\"}", userId, request.getEmail());
        return user;
    }

    public User getById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            log.warn("{\"action\":\"fetch\",\"userId\":\"{}\",\"result\":\"not_found\"}", userId);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + userId);
        });
    }
}
