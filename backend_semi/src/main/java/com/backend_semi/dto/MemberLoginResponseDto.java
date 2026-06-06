package com.backend_semi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginResponseDto {
    private String accessToken;
    private Long memberId;
    private String name; // 사용자 이름을 프론트에 던져줄 용도
    private String Role;
}
