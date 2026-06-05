package com.backend_semi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:9000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowCredentials(true) ;
    }

    @Value("${uploadPath}")
    private String uploadPath;

    //공지사항 첨부파일 설정
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 파일 접근 경로
        registry
                .addResourceHandler("/images/**")
                .addResourceLocations(uploadPath);

        // 공지사항 첨부파일 접근 경로
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir);
    }


}