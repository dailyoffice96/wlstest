package com.backend_semi.service;

import com.backend_semi.constant.Role;
import com.backend_semi.dto.AdminMemberDto;
import com.backend_semi.dto.AdminPageDto;
import com.backend_semi.entity.Member;
import com.backend_semi.repository.LectureRepository;
import com.backend_semi.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminInformationService {

    public final MemberRepository memberRepository;
    public final LectureRepository lectureRepository;

    //회원 및 학습 현황 조회
    public AdminPageDto getAdminStatus(){
        long totalMemberCount = memberRepository.count();

        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        long todayJoinMember = memberRepository.countByCreatedAtBetween(start, end);

        long totalLectureCount = lectureRepository.count();

        AdminPageDto dto = new AdminPageDto();
        dto.setTotalMemberCount(totalMemberCount);
        dto.setTodayJoinMember(todayJoinMember);
        dto.setTotalLectureCount(totalLectureCount);

        return dto;
    }

    //회원 목록 + 아이디 검색 + 페이징 조회
    public Page<AdminMemberDto> getMemberList( String keyword, String role,
                                               int page, int size){
        Pageable pageable = PageRequest.of(page, size,
                            Sort.by(Sort.Direction.DESC, "memberId"));

        Page<Member> member;

        if (keyword != null && !keyword.isBlank()) {
            member = memberRepository.findByLoginIdContaining(keyword, pageable);
        } else if (role != null && !role.isBlank()) {
            member = memberRepository.findByRole(Role.valueOf(role), pageable);
        } else {
            member = memberRepository.findAll(pageable);
        }

        return member.map(AdminMemberDto::new);
    }


    // 권한 변경
    @Transactional
    public void updateMemberRole(Long memberId, String role){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원 권한 변경이 불가능합니다."));

        member.changeRole(Role.valueOf(role));
    }

    //회원 탈퇴
    @Transactional
    public void deleteMember(Long memberId){
        Member member = memberRepository.findById(memberId)
              .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        memberRepository.delete(member);
    }

}
