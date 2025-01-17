package com.springdemo.demo.service.impl;

import com.springdemo.demo.model.User;
import com.springdemo.demo.repository.UserRepository;
import com.springdemo.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // Sign up method (now returns User with accessToken)
    @Override
    public User signUp(User user) {
        String accessToken = UUID.randomUUID().toString();
        user.setAccesstoken(accessToken);
        return userRepository.save(user);
    }

    // Login method
    @Override
    public User login(String email, String passwordhash) {
        return userRepository.findByEmailAndPassword(email, passwordhash);
    }

    // Update the access token
    @Override
    public String updateAccessToken(String email) {
        String newAccessToken = UUID.randomUUID().toString();
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        user.setAccesstoken(newAccessToken);
        userRepository.save(user);  // Save the updated user with the new token
    
        return newAccessToken;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findById(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(User user, String email) {
        User existingUser = userRepository.findById(email).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());
        existingUser.setPassword(user.getPassword());
        existingUser.setAccesstoken(user.getAccesstoken());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(String email) {
        userRepository.findById(email).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.deleteById(email);
    }
}
