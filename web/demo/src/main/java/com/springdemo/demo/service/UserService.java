package com.springdemo.demo.service;

import com.springdemo.demo.model.User;
import java.util.List;

public interface UserService {
    User signUp(User user);  // Changed method name to 'signUp'
    User login(String email, String password);
    String updateAccessToken(String email);
    List<User> getAllUser();
    User getUserByEmail(String email);
    User updateUser(User user, String email);
    void deleteUser(String email);
}
