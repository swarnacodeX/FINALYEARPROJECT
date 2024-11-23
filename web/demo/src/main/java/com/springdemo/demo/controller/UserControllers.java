package com.springdemo.demo.controller;
import com.springdemo.demo.model.User;
import com.springdemo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserControllers {

    @Autowired
    private UserService userService;
        public static String generateSHA256(String input) {
        try {
            // Create a MessageDigest instance for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Convert input string to bytes and calculate the hash
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            
            // Convert byte array to hexadecimal string
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating SHA-256 hash", e);
        }
    }

    // Signup new user
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody User user) {
        String hashedPassword = generateSHA256(user.getPassword());
        user.setPassword(hashedPassword);
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
        String passwordhash=generateSHA256(password);

        User user = userService.login(email, passwordhash);

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
