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
import java.util.List;

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
                        .plant(id)
                        .date(new Timestamp(System.currentTimeMillis()).toString().split(" ")[0])
                        .build()
        );



        return true;
    }


    public Long getCountNum(Long id) {
        //List<Emotion> emotions = emotionRepository.findByPlantAndDate(id, new Timestamp(System.currentTimeMillis()).toString().split(" ")[0]);
        //return emotions.size();

        return emotionRepository.countEmotionsByPlantEqualsAndDateEquals(id, new Timestamp(System.currentTimeMillis()).toString().split(" ")[0]);

    }
}
