package com.backend_semi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MemberInfoUpdateRequest {
    // 회원정보를 수정하기 위한 정보를 받는 Dto
    private String phone;
    private String email;
    private LocalDate birthDate;
    private List<Long> memberLearningProfiles;

    // 선택적 OPTIONAL
    private String currentPassword;
    private String newPassword;
    private String newPasswordConfirm;
}
