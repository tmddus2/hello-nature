package helloNature.backend.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import helloNature.backend.domain.user.User;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
public class JWTUtil {
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(JwtProperties.SECRET);
    private static final long AUTH_TIME = 60*60*24*7;
    private static final long REFRESH_TIME = 60*60*24*7;

    public static String makeAuthToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("exp", Instant.now().getEpochSecond()+AUTH_TIME)
                .sign(ALGORITHM);
    }

    public static String makeRefreshToken(User user) {
        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("exp", Instant.now().getEpochSecond()+REFRESH_TIME)
                .sign(ALGORITHM);
    }

    public static VerifyResult verify(String token) {
        DecodedJWT verify = JWT.require(ALGORITHM).build().verify(token);
        return VerifyResult.builder().success(true).username(verify.getSubject()).build();
    }
}
