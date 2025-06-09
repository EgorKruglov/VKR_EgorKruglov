package org.example;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.user.UserRepository;
import org.example.user.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer {  // вот этот класс нельзя отправлять на github или выкладывать куда-либо
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail("admin1@example.com").isEmpty()) {  // Создание администратора
            User user = new User();
            user.setEmail("admin1@example.com");
            user.setPassword(passwordEncoder.encode("admin1Password"));
            user.setRoles(List.of("ROLE_ADMIN"));
            userRepository.save(user);
        }
        /*if (userRepository.findByEmail("test@example2.com").isEmpty()) {
            User user = new User();
            user.setEmail("test2@example.com");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
        }*/
        log.info("БАЗОВАЯ ИНИЦИАЛИЗАЦИЯ УСПЕШНА");
    }
}
