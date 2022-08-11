package helloNature.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;


@EnableWebSecurity // 기본적인 web 보안을 활성화 하겠다
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    private final JwtCheckFilter checkFilter;


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                //토큰을 검증
                .addFilterAt(checkFilter, BasicAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/api/user/**").hasRole("USER");
                //.anyRequest().authenticated();

        return http.build();
    }
}
