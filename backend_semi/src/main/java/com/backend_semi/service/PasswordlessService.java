package com.backend_semi.service;


import com.backend_semi.dto.PasswordlessDto;
import org.springframework.stereotype.Service;

@Service
public class PasswordlessService {

    public PasswordlessDto getRegister(){
        return new PasswordlessDto(
                "data:image/png;base64,임시QR값",
                "passwordless-edu.oneidpay.com",
                "TEST-REGISTER-KEY"
        );
    }
}
