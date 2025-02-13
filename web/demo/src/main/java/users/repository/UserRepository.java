package users.repository;

import users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
    // Query to find a user by email and password
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    User findByEmailAndPassword(String email, String password);

    // Query to update the access token
    @Modifying
    @Query("UPDATE User u SET u.accesstoken = :accesstoken WHERE u.email = :email")
    void updateAccessToken(String email, String accesstoken);
}
