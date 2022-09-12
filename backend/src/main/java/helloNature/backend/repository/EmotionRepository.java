package helloNature.backend.repository;

import helloNature.backend.Entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmotionRepository extends JpaRepository<Emotion,Long> {

    List<Emotion> findByPlantAndDate(Long id, String date);


    Long countEmotionsByPlantEqualsAndDateEquals(Long id, String date);


}
