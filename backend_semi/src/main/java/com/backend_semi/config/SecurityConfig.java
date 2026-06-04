package com.backend_semi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.backend_semi.security.JwtAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        // PW를 암호화해서 DB에 추가하기 위함
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                .authorizeHttpRequests(auth -> auth
                        // H2 콘솔은 개발 중 DB 확인용으로 사용하므로 인증 없이 접근 허용
//                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/api/members/signup").permitAll()
                        .requestMatchers("/api/members/login").permitAll()
                        .requestMatchers("/api/notices/**").permitAll()
                        .anyRequest().permitAll()
                )
                // 요청이 Controller에 도달하기 전에 JWT 토큰을 먼저 검사함
                // 토큰이 정상인 경우 SecurityContext에 회원 정보를 저장함
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}