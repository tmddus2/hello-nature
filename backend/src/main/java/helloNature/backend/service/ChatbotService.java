package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Water;
import helloNature.backend.dto.WaterDto;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.WaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatbotService {

    private final WaterRepository waterRepository;
    private final PlantRepository plantRepository;

    public WaterDto getWaterCondition(Long plant_id) {
        Plant plant = plantRepository.findPlantById(plant_id);
        Water water = waterRepository.findWaterByPlant(plant);

        WaterDto waterDto = WaterDto.builder()
                .id(plant_id)
                .lasted_date(water.getLatest_water_date())
                .expected_date(water.getExpected_water_date())
                .condition(water.getWater_condition())
                .build();

        return waterDto;
    }
}
