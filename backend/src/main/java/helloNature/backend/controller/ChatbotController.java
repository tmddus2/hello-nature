package helloNature.backend.controller;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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

    @PostMapping("/user/chatbot")
    public Object dialogFlowWebHook(Principal principal, HttpServletRequest request, HttpServletResponse response) throws IOException { // HttpServletRequest request, , HttpServletResponse response
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
                responseText = '"' + "이건 제 정보입니다!" + '"';
            } else if (str.equals('"'+"PLANT_WATER"+'"')) {
                responseText = '"' + "이건 제 수분 정보입니다!" + '"';
            } else {
                responseText = '"' + principal.getName() + " HELLO!"+ '"';
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

}
