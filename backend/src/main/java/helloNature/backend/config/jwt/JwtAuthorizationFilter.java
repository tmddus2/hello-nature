package helloNature.backend.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import helloNature.backend.config.auth.PrincipalDetails;
import helloNature.backend.domain.user.User;
import helloNature.backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String bearer = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(bearer == null || !bearer.startsWith("Bearer ")){
            try{
                chain.doFilter(request, response);
                return;
            }catch(Exception e){
                System.out.println(e.getMessage());
                response.setStatus(200);
                response.setContentType("application/json;charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("{ \"success\" :" + false+"}" );

            }

        }
        else {
            String token = bearer.substring("Bearer ".length());

            try {
                VerifyResult result = JWTUtil.verify(token);
                User user = userRepository.findByUsername(result.getUsername()).get();
                UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(
                        user.getUsername(), null, user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(userToken);
                chain.doFilter(request, response);

            } catch (Exception e) {
                System.out.println(e.getMessage());
                response.setStatus(200);
                response.setContentType("application/json;charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println("{ \"success\" :" + false + "}");
            }
        }
    }
}
