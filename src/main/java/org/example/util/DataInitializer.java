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
public class DataInitializer {  // Создаем здесь пользователей тестовых, потому лень писать скрипт sql, чтобы без ролей создавался
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
   /*     if (userRepository.findByEmail("test@example1.com").isEmpty()) {
            User user = new User();
            user.setEmail("test1@example.com");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
        }
        if (userRepository.findByEmail("test@example2.com").isEmpty()) {
            User user = new User();
            user.setEmail("test2@example.com");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
        }
        log.info("БАЗОВАЯ ИНИЦИАЛИЗАЦИЯ УСПЕШНА");*/
    }
}
