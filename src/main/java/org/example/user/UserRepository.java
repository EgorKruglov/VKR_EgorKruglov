package org.example.user;

import org.example.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END " +
            "FROM User u " +
            "WHERE u.email = :email")
    boolean isEmailExist(@Param("email") String email);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END " +
            "FROM User u " +
            "WHERE u.password = :password")
    boolean isPasswordExist(@Param("password") String password);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END " +
            "FROM User u " +
            "WHERE u.phone = :phone")
    boolean isPhoneExist(@Param("phone") String phone);

    Optional<User> findByEmail(String email);
}
