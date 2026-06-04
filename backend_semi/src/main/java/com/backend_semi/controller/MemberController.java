package com.backend_semi.controller;

import com.backend_semi.dto.*;
import com.backend_semi.service.MemberService;
import com.backend_semi.dto.MemberLoginRequest;
import com.backend_semi.dto.MemberLoginResponse;
import com.backend_semi.dto.MemberSignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.backend_semi.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Long> signup(@RequestBody MemberSignupRequest request){
        Long memberId = memberService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(memberId);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody MemberLoginRequest request){
        MemberLoginResponse response = memberService.login(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/token-test")
    public ResponseEntity<?> tokenTest(@RequestHeader("Authorization") String authorizationHeader){

        String token = authorizationHeader.replace("Bearer ", "");

        Claims claims = jwtUtil.parseToken(token);

        Long memberId = Long.valueOf(claims.getSubject());
        String loginId = claims.get("loginId", String.class);
        String name = claims.get("name", String.class);

        return ResponseEntity.ok(
                "토큰 검증 성공 / memberId = " + memberId
                                +", loginId = " + loginId
                                +", name = " + name
        );
    }

    @GetMapping("/me")
    public ResponseEntity<MemberInfoResponse> getMyInfo(){
        Authentication authenticaton  = SecurityContextHolder.getContext().getAuthentication();

        Long memberId = (Long) authenticaton.getPrincipal();

        MemberInfoResponse response = memberService.getMyInfo(memberId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/checkId")
    public ResponseEntity<Boolean> checkLoginIdDuplicate(@RequestParam String loginId){
        boolean isDuplicate = memberService.checkLoginDuplicate(loginId);

        return ResponseEntity.ok(isDuplicate);
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            Authentication authentication,
            @RequestBody MemberPasswordChangeRequest request
    ){
        String loginId = authentication.getName();
        memberService.changePassword(loginId, request);
        return ResponseEntity.ok().build();
    }

}