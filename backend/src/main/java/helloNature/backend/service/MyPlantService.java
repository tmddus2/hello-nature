package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.dto.PlantDto;
import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MyPlantService {

    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    public List<PlantDto> getMyPlantList(String username) {
        User user = userRepository.findByUsername(username).get();
        List<PlantDto> plantDtoList = new ArrayList<>();
        List<Plant> plantList = plantRepository.findPlantByUserId(user.getId());
        for(Plant plant: plantList) {
            PlantDto plantDto = PlantDto.builder()
                    .id(plant.getId())
                    .name(plant.getName())
                    .memo(plant.getMemo())
                    .picture(plant.getPicture())
                    .scientific_name(plant.getScientific_name())
                    .start_date(plant.getStart_date())
                    .type(plant.getType())
                    .build();
            plantDtoList.add(plantDto);
        }

        return plantDtoList;

    }


    public PlantDto saveMyPlant(String username, PlantRegistrationDto plantRegistrationDto) {
        String image = s3Service.saveImage(plantRegistrationDto.getPicture());
        User user = userRepository.findByUsername(username).get();


        if (user == null) {
            return null;
        } else {
            Plant plant = plantRepository.save(
                    Plant.builder()
                            .picture(image)
                            .type(plantRegistrationDto.getType())
                            .name(plantRegistrationDto.getName())
                            .start_date(plantRegistrationDto.getStart_date())
                            .scientific_name(plantRegistrationDto.getScientific_name())
                            .memo(plantRegistrationDto.getMemo())
                            .user(user)
                            .build()
            );

            return PlantDto.builder()
                    .id(plant.getId())
                    .name(plant.getName())
                    .type(plant.getType())
                    .start_date(plant.getStart_date())
                    .picture(plant.getPicture())
                    .memo(plant.getMemo())
                    .scientific_name(plant.getScientific_name())
                    .build();
        }
    }

}
