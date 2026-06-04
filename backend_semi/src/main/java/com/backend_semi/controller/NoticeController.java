package com.backend_semi.controller;

import com.backend_semi.dto.NoticeRequest;
import com.backend_semi.dto.NoticeResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend_semi.service.NoticeService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // 공지사항 등록
    @PostMapping
    public ResponseEntity<Long> createNotice(
            Authentication authentication,
            @RequestBody NoticeRequest request
    ) {
        String loginId = authentication.getName();
        Long noticeId = noticeService.createNotice(loginId, request);
        log.info("멤바 아이디" + loginId);
        return ResponseEntity.ok(noticeId);
    }

    // 전체 공지사항 조회
    @GetMapping
    public ResponseEntity<List<NoticeResponse>> getNoticeList(){
        List<NoticeResponse> notices = noticeService.getNoticeList();

        return ResponseEntity.ok(notices);
    }

    // 공지사항 단건 조회
    @GetMapping("/{noticeId}")
    public ResponseEntity<NoticeResponse> getNotice(@PathVariable Long noticeId){
        NoticeResponse notice = noticeService.getNotice(noticeId);

        return ResponseEntity.ok(notice);
    }

    // 카테고리별 공지사항 조회
    @GetMapping("/category/{noticeCateogryId}")
    public ResponseEntity<List<NoticeResponse>> getNoticeListByCategory(@PathVariable Long noticeCategoryId){
        List<NoticeResponse> notices = noticeService.getNoticeListByCategory(noticeCategoryId);

        return ResponseEntity.ok(notices);
    }

    // 작성자별 공지사항 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<NoticeResponse>> getNoticeListByMember(@PathVariable Long memberId){
        List<NoticeResponse> notices = noticeService.getNoticeListByMember(memberId);

        return ResponseEntity.ok(notices);
    }

    // 공지사항 수정
    @PutMapping("/{noticeId}")
    public ResponseEntity<Void> updateNotice(
            Authentication autehntication,
            @PathVariable Long noticeId,
            @RequestBody NoticeRequest request
    ){
        String loginId = autehntication.getName();

        noticeService.updateNotice(loginId, noticeId, request);

        return ResponseEntity.ok().build();
    }

    // 공지사항 삭제
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Void> deleteNotice(
            Authentication authentication,
            @PathVariable Long noticeId   ){
        String loginId = authentication.getName();

        noticeService.deleteNotice(loginId, noticeId);

        return ResponseEntity.noContent().build();
    }
}
