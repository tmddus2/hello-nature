package helloNature.backend.service;

import helloNature.backend.Entity.Emotion;
import helloNature.backend.Entity.Plant;
import helloNature.backend.repository.EmotionRepository;
import helloNature.backend.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
@Transactional
public class ArService {

    private final PlantRepository plantRepository;
    private final EmotionRepository emotionRepository;


    public Boolean clickHeart(Long id){
        Plant plant = plantRepository.findPlantById(id);

        if (plant==null) {
            return false;
        }


        emotionRepository.save(
                Emotion.builder()
                        .plant_id(id)
                        .time(new Timestamp(System.currentTimeMillis()))
                        .build()
        );



        return true;
    }


}
