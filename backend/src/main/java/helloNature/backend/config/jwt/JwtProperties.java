package helloNature.backend.config.jwt;

public interface JwtProperties {
    String SECRET = "hello-nature";
    int EXPIRATION_TIME = 864000000;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
