package com.backend_semi.controller;


import com.backend_semi.dto.AdminMemberDto;
import com.backend_semi.dto.AdminPageDto;
import com.backend_semi.service.AdminInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminInformationController {

    private final AdminInformationService adminInformationService;

    //회원 및 학습 현황 조회
    @GetMapping
    public ResponseEntity<AdminPageDto> getAdminStatus(){
         AdminPageDto response = adminInformationService.getAdminStatus();

            return ResponseEntity.ok(response);
    }

    //회원 목록 + 아이디 검색 + 페이징 조회
    @GetMapping("/members")
    public ResponseEntity<Page<AdminMemberDto>> getMemberList(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Page<AdminMemberDto> response = adminInformationService.getMemberList(
                keyword, role, page, size);

        return ResponseEntity.ok(response);

    }

    // 권한 변경
    @PutMapping("/members/{memberId}/role")
    public ResponseEntity<Void> updateMemberRole(
            @PathVariable Long memberId,
            @RequestBody AdminMemberDto request){

        adminInformationService.updateMemberRole(memberId, request.getRole());

        return ResponseEntity.ok().build();
    }

    //회원 탈퇴
    @DeleteMapping("/members/{memberId}")
    public ResponseEntity<Void> deleteMember(
            @PathVariable Long memberId){

        adminInformationService.deleteMember(memberId);
        return ResponseEntity.ok().build();
    }

}
