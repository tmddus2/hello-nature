package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Water;
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

    public Object getWaterCondition(Long plant_id) {
        Plant plant = plantRepository.findPlantById(plant_id);
        System.out.println("plant = " + plant);
        Water water = waterRepository.findWaterByPlant(plant);
        System.out.println("water = " + water);

        return water;
    }
}
