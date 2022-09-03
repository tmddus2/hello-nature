package helloNature.backend.controller;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.Entity.Water;
import helloNature.backend.dto.PlantDto;
import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.dto.WaterDto;
import helloNature.backend.service.MyPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class PlantController {
    private final MyPlantService myPlantService;

    @GetMapping("/user/plant")
    public List<PlantDto> getMyPlant(Principal principal) {
        List<PlantDto> plantList = myPlantService.getMyPlantList(principal.getName());
        return plantList;
    }

    @PostMapping("/user/plant")
    public PlantDto registerPlant(Principal principal, @RequestBody PlantRegistrationDto plantRegistrationDto) {
        return myPlantService.saveMyPlant(principal.getName(), plantRegistrationDto);

    }

    @PostMapping("/user/plant/water")
    public Water registerWaterCondition(@RequestBody WaterDto waterDto) {
        return myPlantService.saveWaterCondition(waterDto);
    }
}
