package helloNature.backend.controller;

import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.service.MyPlantService;
import helloNature.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @PostMapping("/user/registration")
    public Object registratePlant(Principal principal, @RequestBody PlantRegistrationDto plantRegistrationDto) {
        return userService.saveMyPlant(principal.getName(), plantRegistrationDto);

    }
}
