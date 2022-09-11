package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;


    public User getUserByName(String username) {
        return userRepository.findByUsername(username).get();
    }


}
