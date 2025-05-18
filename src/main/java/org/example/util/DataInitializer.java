package org.example.util;

import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.user.UserRepository;
import org.example.user.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer {
    /*private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            User user = new User();
            user.setEmail("test@example.com");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
            log.info("БАЗОВАЯ ИНИЦИАЛИЗАЦИЯ УСПЕШНА");
        }
    }*/
}
