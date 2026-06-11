package com.backend_semi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminPageDto {

    //총 회원수
    private long totalMemberCount;

    //오늘 가입한 회원수
    private long todayJoinMember;

    //총 강의수
    private long totalLectureCount;

}
