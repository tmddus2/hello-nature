package helloNature.backend.controller;

import helloNature.backend.Entity.Plant;
import helloNature.backend.Entity.User;
import helloNature.backend.dto.PlantDto;
import helloNature.backend.dto.PlantRegistrationDto;
import helloNature.backend.service.MyPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public PlantDto registerPlant(Principal principal, PlantRegistrationDto plantRegistrationDto) {
        return myPlantService.saveMyPlant(principal.getName(), plantRegistrationDto);

    }
}
