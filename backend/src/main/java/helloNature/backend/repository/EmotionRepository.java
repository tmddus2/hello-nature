package helloNature.backend.repository;

import helloNature.backend.Entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<Emotion,Long> {

}
