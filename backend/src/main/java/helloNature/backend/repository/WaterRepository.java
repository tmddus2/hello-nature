package helloNature.backend.repository;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Water;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterRepository extends JpaRepository<Water, Long> {

    Water findWaterByPlant(Plant plant);
}
