package helloNature.backend.controller;

import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.service.MyPlantService;
import helloNature.backend.service.S3Service;
import helloNature.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;




}
