package helloNature.backend.repository;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<Plant> findPlantListByUsername(String username);
}
