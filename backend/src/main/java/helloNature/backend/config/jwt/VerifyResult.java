package helloNature.backend.config.jwt;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerifyResult {
    private boolean success;
    private String username;
}
