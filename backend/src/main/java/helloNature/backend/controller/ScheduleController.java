package helloNature.backend.controller;

import helloNature.backend.dto.ScheduleDto;
import helloNature.backend.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/user/schedule")
    public List<ScheduleDto> getScheduleList(@RequestParam Long id) {
        return scheduleService.getSchedule(id);
    }

    @GetMapping("/user/schedule/month")
    public List<ScheduleDto> getScheduleListByMonth(@RequestParam Long id, @RequestParam String year, @RequestParam String month) {
        return scheduleService.getScheduleByMonth(id, year, month);
    }

    @GetMapping("/user/schedule/day")
    public List<ScheduleDto> getScheduleListByDay(@RequestParam Long id, @RequestParam String year, @RequestParam String month, @RequestParam String day) {
        return scheduleService.getScheduleByDay(id, year, month, day);
    }

    @PostMapping("/user/schedule")
    public ScheduleDto addSchedule(@RequestBody ScheduleDto scheduleDto) {
        return scheduleService.addSchedule(scheduleDto);

    }

}
