package com.backend_semi.dto;

import com.backend_semi.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class AdminMemberDto {

    private Long memberId;
    private String loginId;
    private String name;
    private String email;
    private LocalDate createdAt;
    private String role;

    public AdminMemberDto(Member member) {
        this.memberId = member.getMemberId();
        this.loginId = member.getLoginId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.role = member.getRole().name();
        this.createdAt = member.getCreatedAt().toLocalDate();
    }
}
