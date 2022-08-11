package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MyPlantService {

    private final PlantRepository plantRepository;



    /*
    public List<Plant> getMyPlant(String name) {
        Optional<Plant> plant = plantRepository.findByName(name);
        if ()
    }

     */
}
