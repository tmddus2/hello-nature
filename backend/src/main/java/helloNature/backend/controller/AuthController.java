package helloNature.backend.controller;

import helloNature.backend.Entity.User;
import helloNature.backend.config.JWTUtil;
import helloNature.backend.dto.SigninDto;
import helloNature.backend.dto.SignupDto;
import helloNature.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;


    @PostMapping("/signup")
    public User signup(@RequestBody SignupDto signupDto) {
        return authService.signup(signupDto);
    }

    @PostMapping("/signin")
    public Object signin(@RequestBody SigninDto signinDto, HttpServletRequest request, HttpServletResponse response) {
        try {
            System.out.println(signinDto);
            User user = authService.getValidUser(signinDto);
            response.setHeader("auth_token", JWTUtil.makeAuthToken(user));
            response.setHeader("refresh_token", JWTUtil.makeRefreshToken(user));
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

            return user;
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
    }

    @GetMapping("/user/test-success")
    public String test(Principal principal) {
        System.out.println(principal.getName());
        return principal.toString();
    }



}
