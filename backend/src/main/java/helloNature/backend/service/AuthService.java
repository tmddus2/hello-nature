package helloNature.backend.service;

<<<<<<< HEAD
import helloNature.backend.domain.user.User;
import helloNature.backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
=======
import helloNature.backend.Entity.User;
import helloNature.backend.repository.UserRepository;
import helloNature.backend.dto.SigninDto;
import helloNature.backend.dto.SignupDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
>>>>>>> Structure
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
<<<<<<< HEAD
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public User sign_in(User user) {
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        user.setRole("ROLE_USER");
        User userEntity = userRepository.save(user);

        return userEntity;
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).get();
=======
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
>>>>>>> Structure
    }
}
