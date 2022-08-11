package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Schedule;
import helloNature.backend.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final PlantRepository plantRepository;

    public List<Schedule> getSchedule(String name) {
        Plant plant = plantRepository.findByName(name).get();
        if (plant==null) {
            return null;
        } else {
            return plant.getScheduleList();
        }
    }
}
