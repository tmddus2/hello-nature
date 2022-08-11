package helloNature.backend.repository;

import helloNature.backend.Entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByName(String name);
}
