package helloNature.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@NoArgsConstructor
//@Builder
public class WaterDto {

    private Long id; // plant_id
    private String lasted_date;
    private String expected_date;
    private Boolean condition;

}
