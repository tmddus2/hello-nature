package helloNature.backend.controller;

<<<<<<< HEAD
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import helloNature.backend.config.auth.PrincipalDetails;
import helloNature.backend.config.jwt.JWTUtil;
import helloNature.backend.config.jwt.JwtProperties;
import helloNature.backend.domain.user.User;
=======
import helloNature.backend.Entity.User;
import helloNature.backend.config.JWTUtil;
>>>>>>> Structure
import helloNature.backend.dto.SigninDto;
import helloNature.backend.dto.SignupDto;
import helloNature.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
=======
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
>>>>>>> Structure
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
<<<<<<< HEAD
import java.util.Date;

@RequiredArgsConstructor
//@Controller
@RestController
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;


    //@ResponseBody
    @PostMapping("/auth/signup")
    public User signup(@RequestBody SignupDto signupDto) {
        User user = User.builder()
                .name(signupDto.getName())
                .password(signupDto.getPassword())
                .email(signupDto.getEmail())
                .username(signupDto.getUsername())
                .enabled(true).build();
        User userEntity = authService.sign_in(user);
        return userEntity;
    }

    //@ResponseBody
    @PostMapping("/auth/signin")
    public Object signin(@RequestBody SigninDto signinDto, HttpServletResponse response) {
        try {
            User user = User.builder()
                    .username(signinDto.getUsername())
                    .password(signinDto.getPassword())
                    .build();

=======


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
            User user = authService.getValidUser(signinDto);
>>>>>>> Structure
            response.setHeader("auth_token", JWTUtil.makeAuthToken(user));
            response.setHeader("refresh_token", JWTUtil.makeRefreshToken(user));
            response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

<<<<<<< HEAD
            return true;

        } catch (Exception e) {
=======
            return "success";
        } catch (IllegalArgumentException e) {
>>>>>>> Structure
            return e.getMessage();
        }
    }

<<<<<<< HEAD
    //@ResponseBody
    @GetMapping("/user/test")
    public String testUser(Principal principal) {
        System.out.println("principal = " + principal);
=======
    @GetMapping("/user/test-success")
    public String test(Principal principal) {
        System.out.println(principal.getName());
>>>>>>> Structure
        return principal.toString();
    }


<<<<<<< HEAD
=======

>>>>>>> Structure
}
