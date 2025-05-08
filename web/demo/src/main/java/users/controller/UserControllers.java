package users.controller;

import users.model.User;
import users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserControllers {

    @Autowired
    private UserService userService;

    public static String generateSHA256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
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
        String passwordhash = generateSHA256(password);

        User user = userService.login(email, passwordhash);

        if (user != null) {
            String newAccessToken = userService.updateAccessToken(email);
            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            response.put("accesstoken", newAccessToken);
            response.put("firstname", user.getFirstname());
            response.put("lastname", user.getLastname());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    // Change First Name
    @PutMapping("/changefirstname")
    public ResponseEntity<?> changeFirstName(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String newFirstName = request.get("newFirstName");
            User updatedUser = userService.updateFirstName(email, newFirstName);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Change Last Name
    @PutMapping("/changelastname")
    public ResponseEntity<?> changeLastName(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String newLastName = request.get("newLastName");
            User updatedUser = userService.updateLastName(email, newLastName);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Change Password
    @PutMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String newPassword = request.get("newPassword");
            String hashedPassword = generateSHA256(newPassword);
            User updatedUser = userService.updatePassword(email, hashedPassword);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
