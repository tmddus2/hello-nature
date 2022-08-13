package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Schedule;
import helloNature.backend.Entity.User;
import helloNature.backend.dto.ScheduleDto;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.ScheduleRepository;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;

    public List<ScheduleDto> getSchedule(Long id) { // plant_id
        List<Schedule> scheduleList = scheduleRepository.findScheduleByPlantId(id);
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();

        for(Schedule schedule: scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();
            scheduleDto.setId(schedule.getId());
            scheduleDto.setDate(schedule.getDate());
            scheduleDto.setMemo(schedule.getMemo());
            scheduleDto.setTheme(schedule.getTheme());

            scheduleDtoList.add(scheduleDto);
        }

        return scheduleDtoList;

    }

    public ScheduleDto addSchedule(ScheduleDto scheduleDto) {
        Plant plant = plantRepository.findPlantById(scheduleDto.getId());

        Schedule schedule = Schedule.builder()
                .memo(scheduleDto.getMemo())
                .date(scheduleDto.getDate())
                .theme(scheduleDto.getTheme())
                .build();

        if (plant == null) {
            return null;
        } else {
            plant.getScheduleList().add(schedule);

            ScheduleDto returnDto = new ScheduleDto();
            returnDto.setId(schedule.getId());
            returnDto.setMemo(schedule.getMemo());
            returnDto.setDate(schedule.getDate());
            returnDto.setTheme(schedule.getTheme());

            return returnDto;
        }

    }
}
