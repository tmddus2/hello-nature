package helloNature.backend.controller;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import helloNature.backend.dto.PlantDto;
import helloNature.backend.dto.WaterDto;
import helloNature.backend.service.ChatbotService;
import helloNature.backend.service.MyPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.Principal;
import com.google.gson.Gson;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ChatbotController {

    private final ChatbotService chatbotService;
    private final MyPlantService myPlantService;

    @PostMapping("/user/chatbot/water")
    public Object dialogFlowWebHook(Principal principal, HttpServletRequest request, HttpServletResponse response, @RequestParam Long id) throws IOException {
        try {

            // https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook-java
            JsonParser parser = new JsonParser();
            Gson gson = new GsonBuilder().create();
            
            JsonObject job = gson.fromJson(request.getReader(), JsonObject.class);
            String str =
                    job.getAsJsonObject("queryResult")
                            .getAsJsonObject("intent")
                            .getAsJsonPrimitive("displayName")
                            .toString();


            String responseText = "";


            if (str.equals('"'+"PLANT_INFO"+'"')) {
                PlantDto plantDto = myPlantService.getMyPlantInfo(id);

                responseText = '"'
                        + "이건 제 정보입니다!\n"
                        + "이름은 " + plantDto.getName() + "입니다.\n"
                        + "처음 만난 날은 " + plantDto.getBring_date() + "입니다.\n"
                        + "학종은 " + plantDto.getScientific_name() + "입니다.\n"
                        + '"';
            } else if (str.equals('"'+"PLANT_WATER"+'"')) {
                WaterDto waterDto = chatbotService.getWaterCondition(id);
                PlantDto plantDto = myPlantService.getMyPlantInfo(id);

                responseText = '"'
                        + plantDto.getName() + "(이)의 수분 정보가 궁금하신가요?\n"
                        + "마지막으로 물 준 날은 " + waterDto.getLasted_date() + "입니다.\n"
                        + "다음으로 물 줄 날은 " + waterDto.getExpected_date() + "입니다.\n"
                        + "수분 상태는 전체적으로 " + waterDto.getCondition() + "입니다."
                        + '"';
            } else {
                responseText = '"' + "챗봇에 무슨 문제가 있나봐요. 나중에 말 걸어주세요 :( " + '"';
            }


            JsonObject o =
                    parser
                            .parse(
                                    "{\"fulfillmentMessages\": [ { \"text\": { \"text\": [ "
                                            +responseText
                                            + " ] } } ] }")
                            .getAsJsonObject();




            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=UTF-8");


            PrintWriter writer = response.getWriter();
            writer.write(o.toString());
            writer.flush();





            return o.toString();
            
        } catch (Exception e) {
            System.out.println("error: "+e.getMessage());
            return e.getMessage();
        }

    }

    @GetMapping("/user/water-condition")
    public Object getWaterCondition(@RequestParam Long id) {
        return chatbotService.getWaterCondition(id);
    }


}
