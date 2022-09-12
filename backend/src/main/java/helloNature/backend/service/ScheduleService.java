package helloNature.backend.service;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.Schedule;
import helloNature.backend.dto.ScheduleDto;
import helloNature.backend.repository.PlantRepository;
import helloNature.backend.repository.ScheduleRepository;
import helloNature.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final PlantRepository plantRepository;

    public List<ScheduleDto> getSchedule(Long id) { // plant_id
        List<Schedule> scheduleList = scheduleRepository.findScheduleByPlantId(id);
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();

        for(Schedule schedule: scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();
            scheduleDto.setId(schedule.getId());
            scheduleDto.setDate(schedule.getDate());
            scheduleDto.setWater(schedule.getWater());
            scheduleDto.setNutrient(schedule.getNutrient());
            scheduleDto.setMemo(schedule.getMemo());
            scheduleDto.setTheme(schedule.getTheme());

            scheduleDtoList.add(scheduleDto);
        }

        return scheduleDtoList;

    }

    public List<ScheduleDto> getScheduleByMonth(Long id, String year, String month) {
        List<Schedule> scheduleList = scheduleRepository.findScheduleByPlantIdAndYearAndMonth(id, year, month);
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();

        for(Schedule schedule: scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();
            scheduleDto.setId(schedule.getId());
            scheduleDto.setDate(schedule.getDate());
            scheduleDto.setWater(schedule.getWater());
            scheduleDto.setNutrient(schedule.getNutrient());
            scheduleDto.setMemo(schedule.getMemo());
            scheduleDto.setTheme(schedule.getTheme());

            scheduleDtoList.add(scheduleDto);
        }

        return scheduleDtoList;
    }


    public List<ScheduleDto> getScheduleByDay(Long id, String year, String month, String day) {
        List<Schedule> scheduleList = scheduleRepository.findScheduleByPlantIdAndYearAndMonthAndDate(id, year, month, day);
        List<ScheduleDto> scheduleDtoList = new ArrayList<>();

        for(Schedule schedule: scheduleList) {
            ScheduleDto scheduleDto = new ScheduleDto();
            scheduleDto.setId(schedule.getId());
            scheduleDto.setDate(schedule.getDate());
            scheduleDto.setWater(schedule.getWater());
            scheduleDto.setNutrient(schedule.getNutrient());
            scheduleDto.setMemo(schedule.getMemo());
            scheduleDto.setTheme(schedule.getTheme());

            scheduleDtoList.add(scheduleDto);
        }

        return scheduleDtoList;
    }

    public ScheduleDto addSchedule(ScheduleDto scheduleDto) {
        Plant plant = plantRepository.findPlantById(scheduleDto.getId());

        if (plant == null) {
            return null;
        } else {
            String[] date = scheduleDto.getDate().split("-");

            Schedule schedule = scheduleRepository.save(
                    Schedule.builder()
                            .water(scheduleDto.getWater())
                            .nutrient(scheduleDto.getNutrient())
                            .year(date[0])
                            .month(date[1])
                            .date(date[2])
                            .theme(scheduleDto.getTheme())
                            .plant(plant)
                            .build()
            );

            ScheduleDto returnDto = new ScheduleDto();
            returnDto.setId(schedule.getId());
            returnDto.setWater(schedule.getWater());
            returnDto.setNutrient(schedule.getNutrient());
            returnDto.setDate(schedule.getDate());
            returnDto.setTheme(schedule.getTheme());

            return returnDto;
        }

    }
}
