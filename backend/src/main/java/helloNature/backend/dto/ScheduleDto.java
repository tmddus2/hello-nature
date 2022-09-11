package helloNature.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ScheduleDto {
    private Long id;
    private String date;
    private Long water;
    private Long nutrient;
    private String memo;
    private String theme;
}