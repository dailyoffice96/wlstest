package com.backend_semi.controller;

import com.backend_semi.Service.MemberService;
import com.backend_semi.dto.MemberLoginRequest;
import com.backend_semi.dto.MemberLoginResponse;
import com.backend_semi.dto.MemberSignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Long> signup(@RequestBody MemberSignupRequest request){
        Long memberId = memberService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(memberId);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(
            @RequestBody MemberLoginRequest request
    ) {
        MemberLoginResponse response = memberService.login(request);

        return ResponseEntity.ok(response);
    }
}