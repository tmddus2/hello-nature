package helloNature.backend.controller;

import helloNature.backend.service.ArService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ArController {

    private final ArService arService;

    @GetMapping("/user/heart")
    public Boolean clickHeart(@RequestParam Long id){
        return arService.clickHeart(id);
    }
}
