package com.backend_semi.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PasswordlessDto {

    private String qr;
    private String serverUrl;
    private String registerKey;

}
