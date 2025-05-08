package users.service;

import users.model.User;
import users.repository.UserRepository;
import users.service.UserService;
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

    // Update first name
    @Override
    public User updateFirstName(String email, String newFirstName) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstname(newFirstName);
        return userRepository.save(user);
    }

    // Update last name
    @Override
    public User updateLastName(String email, String newLastName) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLastname(newLastName);
        return userRepository.save(user);
    }

    // Update password
    @Override
    public User updatePassword(String email, String newPassword) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(newPassword);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String email) {
        userRepository.findById(email).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.deleteById(email);
    }
    
    // New implementation of updateUser as required by the UserService interface.
    @Override
    public User updateUser(User user, String newValue) {
        // For example, update user's password with newValue.
        user.setPassword(newValue);
        return userRepository.save(user);
    }
}
