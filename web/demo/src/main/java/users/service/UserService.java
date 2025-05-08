package users.service;

import users.model.User;
import java.util.List;

public interface UserService {
    User signUp(User user);  // Changed method name to 'signUp'
    User login(String email, String password);
    String updateAccessToken(String email);
    List<User> getAllUser();
    User getUserByEmail(String email);
    User updateUser(User user, String email);
    void deleteUser(String email);
    User updateFirstName(String email, String newFirstName);
    User updateLastName(String email, String newLastName);  
    User updatePassword(String email, String newPassword);   // Added method to update password
}
