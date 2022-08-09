package helloNature.backend.dto;

import lombok.Data;

@Data
public class PlantRegistrationDto {
    private String picture;
    private String type;
    private String name;
    private String start_date;
    private String scientific_name;
    private String memo;
}
