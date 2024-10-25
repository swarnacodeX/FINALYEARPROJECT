package com.springdemo.demo.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.springdemo.demo.model.User;
import com.springdemo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserControllers {

    @Autowired
    private UserService userService;

    // Signup new user
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody User user) {
        User savedUser = userService.signUp(user);
        // Prepare response with email and accessToken
        Map<String, String> response = new HashMap<>();
        response.put("email", savedUser.getEmail());
        response.put("accessToken", savedUser.getAccesstoken());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userService.login(email, password);

        if (user != null) {
            String newAccessToken = userService.updateAccessToken(email);
            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            response.put("accessToken", newAccessToken);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    
}
