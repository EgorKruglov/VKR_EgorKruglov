package org.example.user;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.user.model.UserDto;
import org.example.user.userAuth.AuthService;
import org.example.user.userAuth.authModel.UserAuthRequest;
import org.example.util.DBmarkers.Create;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/users")
@Slf4j
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/auth/register")
    public ResponseEntity<Object> registerUser(@Validated({Create.class}) @RequestBody UserDto user) {
        log.info("POST запрос на создание пользователя: {}", user);
        return ResponseEntity.status((HttpStatus.CREATED)).body(userService.add(user));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> loginUser(@Validated @RequestBody UserAuthRequest userAuth) {
        log.info("POST запрос на авторизацию пользователя: {}", userAuth);
        return ResponseEntity.ok().body(authService.auth(userAuth));
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> getUser() {
        log.info("GET запрос на получение данных пользователя");
        return ResponseEntity.ok().body(userService.getUser());
    }
}
