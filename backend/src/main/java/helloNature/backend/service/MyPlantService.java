package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.Entity.Water;
import helloNature.backend.dto.PlantDto;
import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.dto.WaterDto;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.UserRepository;
import helloNature.backend.repository.WaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class MyPlantService {

    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final WaterRepository waterRepository;

    public PlantDto getMyPlantInfo(Long id) {
        Plant plant = plantRepository.findPlantById(id);

        PlantDto plantDto = PlantDto.builder()
                .id(plant.getId())
                .name(plant.getName())
                .memo(plant.getMemo())
                .picture(plant.getPicture())
                .scientific_name(plant.getScientific_name())
                .bring_date(plant.getBring_date())
                .type(plant.getType())
                .build();

        return  plantDto;
    }

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
                    .bring_date(plant.getBring_date())
                    .type(plant.getType())
                    .build();
            plantDtoList.add(plantDto);
        }

        return plantDtoList;

    }


    public PlantDto saveMyPlant(String username, PlantRegistrationDto plantRegistrationDto) {
        String image =  plantRegistrationDto.getPicture();
        User user = userRepository.findByUsername(username).get();



        if (user == null) {
            return null;
        } else {
            Plant plant = plantRepository.save(
                    Plant.builder()
                            .picture(image)
                            .type(plantRegistrationDto.getType())
                            .name(plantRegistrationDto.getName())
                            .bring_date(plantRegistrationDto.getBring_date())
                            .scientific_name(plantRegistrationDto.getScientific_name())
                            .memo(plantRegistrationDto.getMemo())
                            .user(user)
                            .water_cycle(plantRegistrationDto.getWater_cycle())
                            //.water(null)
                            .build()
            );
            System.out.println("plant = " + plant);
            return PlantDto.builder()
                    .id(plant.getId())
                    .name(plant.getName())
                    .type(plant.getType())
                    .bring_date(plant.getBring_date())
                    .picture(plant.getPicture())
                    .memo(plant.getMemo())
                    .scientific_name(plant.getScientific_name())
                    .build();
        }
    }

    public Water saveWaterCondition(WaterDto waterDto) {
        Plant plant = plantRepository.findPlantById(waterDto.getId());
        Water water = waterRepository.findWaterByPlant(plant);
        Water result = new Water();

        if (water == null) {
            result = waterRepository.save(
                    Water.builder()
                            //.id(waterDto.getId())
                            .latest_water_date(waterDto.getLasted_date())
                            .expected_water_date(waterDto.getExpected_date())
                            .water_condition(waterDto.getCondition())
                            .plant(plant)
                            .build()
            );
        } else {
            result = waterRepository.save(
                    Water.builder()
                            .id(water.getId())
                            .latest_water_date(waterDto.getLasted_date())
                            .expected_water_date(waterDto.getExpected_date())
                            .water_condition(waterDto.getCondition())
                            .plant(plant)
                            .build()
            );
        }



        return result;
    }

}
