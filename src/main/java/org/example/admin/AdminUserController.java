package org.example.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin/users")
@RequiredArgsConstructor
@Slf4j
public class AdminUserController {
    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Object> getUsers() {
        log.info("GET admin запрос на получение пользователей");
        return ResponseEntity.ok().body(userService.getUsers());
    }
}
