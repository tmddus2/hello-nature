package helloNature.backend.dto;

import lombok.Data;

@Data
public class SignupDto {
    private String username;
    private String password;
    private String email;
    private String picture;
}
