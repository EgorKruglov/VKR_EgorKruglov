package org.example;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")  // или укажи frontend хост
public class WelcomeController {

    @GetMapping("/api/welcome")
    public String welcome() {
        return "Добро пожаловать в АО «Petrichor» – лидера в добыче угля!";
    }
}
