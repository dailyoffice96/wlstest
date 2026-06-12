package com.backend_semi.controller;


import com.backend_semi.service.PasswordlessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/passwordless")
@RequiredArgsConstructor
public class PasswordlessController {

    public final PasswordlessService passwordlessService;

    @GetMapping("/register-info")
    public ResponseEntity<?> getRegister() {
        return ResponseEntity.ok(
                Map.of("data",
                        passwordlessService.getRegister()
                )
        );
    }
}
