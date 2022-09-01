package helloNature.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PlantRegistrationDto {
    private MultipartFile picture;
    private String type;
    private String name;
    private String bring_date;
    private String scientific_name;
    private String memo;
}
