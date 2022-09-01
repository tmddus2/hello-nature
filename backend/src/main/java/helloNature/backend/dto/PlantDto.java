package helloNature.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlantDto {

    private Long id;
    private String name;
    private String type;
    private String bring_date;
    private String picture;
    private String scientific_name;
    private String memo;

}
