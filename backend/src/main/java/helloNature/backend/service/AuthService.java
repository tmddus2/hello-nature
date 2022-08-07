package helloNature.backend.service;

import helloNature.backend.Entity.User;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import helloNature.backend.dto.SigninDto;
import helloNature.backend.dto.SignupDto;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User signup(SignupDto signupDto) {
        if (userRepository.findByUsername(signupDto.getUsername()).isPresent() == true) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        User user = User.builder()
                .username(signupDto.getUsername())
                .email(signupDto.getEmail())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .profile(signupDto.getPicture())
                .role("ROLE_USER")
                .enabled(true)
                .build();
        return userRepository.save(user);
    }

    public User getValidUser(SigninDto signinDto) {
        String username = signinDto.getUsername();
        String password = signinDto.getPassword();
        User user = userRepository.findByUsername(username).get();

        if (user == null) {
            throw new IllegalArgumentException("가입되지 않은 유저입니다");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        return user;

    }

}
