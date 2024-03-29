package helloNature.backend.repository;

import helloNature.backend.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findScheduleByPlantId(Long id);
    List<Schedule> findScheduleByPlantIdAndYearAndMonth(Long id, String year, String month);
    List<Schedule> findScheduleByPlantIdAndYearAndMonthAndDate(Long id, String year, String month, String day);
}
