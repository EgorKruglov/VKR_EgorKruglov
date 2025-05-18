package org.example.user;

import lombok.extern.slf4j.Slf4j;
import org.example.user.model.User;
import org.example.user.model.UserDto;
import org.example.user.model.UserDtoMapper;
import org.example.user.userAuth.authModel.UserAuthRequest;
import org.example.user.userAuth.authModel.UserAuthResponse;
import org.example.util.exception.extraExceptions.ConflictException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserDto add(UserDto user) {
        log.info("Добавление нового пользователя: {}", user);
        if (userRepository.isEmailExist(user.getEmail())) {
            throw new ConflictException("Пользователь с таким email уже существует");
        }
        if (userRepository.isPasswordExist(user.getPassword())) {
            throw new ConflictException("Пользователь с таким password уже существует");
        }
        if (userRepository.isPhoneExist(user.getPhone())) {
            throw new ConflictException("Пользователь с таким phone уже существует");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Кодируем пароль для сохранения в БД
        User resultUser = userRepository.save(UserDtoMapper.dtoToUser(user));
        return UserDtoMapper.userToDto(resultUser);
    }

    @Transactional(readOnly = true)
    public List<UserDto> getUsers() {
        log.info("Получение списка всех пользователей.");
        List<User> usersList = userRepository.findAll();
        List<UserDto> resultList = new ArrayList<>();
        for (User user : usersList) {
            resultList.add(UserDtoMapper.userToDto(user));
        }
        return resultList;
    }

    @Transactional(readOnly = true)
    public UserAuthResponse auth(UserAuthRequest userAuth) {
        // Добавить исключение, если не найден. Или переделать то, которое сейчас есть. Проблема в том, что данные у меня хранятся не закодированные.
        return null;
    }

/*    @Transactional
    public UserDto update(Integer userId, UserDto user) {
        log.info("Обновление пользователя: {}", user);
        if (userId < 0) {
            throw new UserNotFoundException("Id пользователя должен быть неотрицательным.");
        }
        User resultUser = userRepository.findById(userId)
                .orElseThrow(() -> {
                            return new UserNotFoundException("Пользователя с " + userId + " не существует");
                        }
                );
        String name = user.getName();
        if (name != null && !name.isBlank()) {
            resultUser.setName(name);
        }
        String email = user.getEmail();
        if (email != null && !email.isBlank()) {
            resultUser.setEmail(email);
        }
        return UserDtoMapper.userToDto(resultUser);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Integer userId) {
        log.info("Получение пользователя по id: {}", userId);
        if (userId < 0) {
            throw new UserNotFoundException("Id пользователя должен быть неотрицательным.");
        }
        User resultUser = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Пользователь не найден")
        );
        return UserDtoMapper.userToDto(resultUser);
    }

    @Transactional
    public void deleteUser(Integer userId) {
        log.info("Удаление пользователя c id:" + userId);
        if (userId < 0) {
            throw new UserNotFoundException("Id пользователя должен быть неотрицательным.");
        }
        userRepository.deleteById(userId);
    }*/
}
