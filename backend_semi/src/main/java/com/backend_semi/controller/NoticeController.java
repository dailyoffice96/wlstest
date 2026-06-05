package com.backend_semi.controller;

import com.backend_semi.service.NoticeService;
import com.backend_semi.dto.NoticeDetaildto;
import com.backend_semi.dto.NoticeListdto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 공지사항 페이징 목록 조회
    // 클라이언트로부터 페이지 번호(page)와 한 페이지당 개수(size)를 받아 해당 범위의 게시글 목록을 반환
    @GetMapping
    public Page<NoticeListdto> getNoticeList(
            @RequestParam(defaultValue = "0") int page, // 페이지 시작 번호
            @RequestParam(defaultValue = "5") int size  // 한 페이지에 보여줄 데이터의 개수
    ) {
        return noticeService.getNoticeList(page, size);
    }

    // 공지사항 검색 기능
    // 검색 조건(type)과 키워드, 페이징 정보를 기반으로 검색된 게시글 목록을 반환
    @GetMapping("/search/list")
    public Page<NoticeListdto> searchNotice(
            @RequestParam(defaultValue = "all") String type,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return noticeService.searchNotice(type, keyword, page, size);
    }

    // 공지사항 상세조회
    // 특정 noticeId를 경로 변수로 받아 해당 게시글의 상세 정보를 반환
    @GetMapping("/{noticeId}")
    public ResponseEntity<NoticeDetaildto> getNoticeDetail(@PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.getNoticeDetail(noticeId));
    }

    // 파일 다운로드 처리
    // DB에 저장된 첨부파일 경로를 이용하여 실제 파일을 다운로드함
    // 파일 저장 위치는 application.properties의 설정값을 사용함
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws Exception {
        Path path = Paths.get(uploadDir, filename);
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("파일을 찾을 수 없습니다: " + filename);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                .body(resource);
    }

    // 업데이트 공지사항 목록 조회
    // 서비스 계층을 통해 카테고리가 '업데이트'인 공지사항만 페이지 단위로 가져옴
    @GetMapping("/update")
    public ResponseEntity<Page<NoticeListdto>> getUpdateNotices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(noticeService.getUpdateNotices(page, size));
    }

    // 중요 공지사항 목록 조회
    // isImportant 플래그가 설정된 공지사항만 페이징하여 반환
    @GetMapping("/important")
    public ResponseEntity<Page<NoticeListdto>> getImportantNotices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(noticeService.getImportantNotices(page, size));
    }

    // 공지사항 생성
    // @ModelAttribute를 통해 DTO로 게시글 폼 데이터를 받고, @RequestParam으로 파일 데이터를 처리
    // @ModelAttribute 사용 이유: PDF 등 파일과 게시글 정보를 한 번의 요청으로 받기 위해 폼 데이터로 처
    @PostMapping
    public ResponseEntity<NoticeListdto> createNotice(
            @ModelAttribute NoticeListdto dto,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        return ResponseEntity.ok(noticeService.createNotice(dto, file));
    }

    // 공지사항 수정
    // 게시글 내용(DTO)과 함께 파일 변경(새 파일 업로드 또는 삭제)을 반영하여 수정
    @PutMapping("/{noticeId}")
    public ResponseEntity<NoticeDetaildto> updateNotice(
            @PathVariable Long noticeId,
            @ModelAttribute NoticeDetaildto dto,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "removeFile", defaultValue = "false") boolean removeFile
    ) {
        return ResponseEntity.ok(noticeService.updateNotice(noticeId, dto, file, removeFile));
    }

    // 공지사항 삭제
    // 특정 noticeId를 삭제하고 성공적으로 처리되었음을 알리는 204 No Content 상태 코드를 반환
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long noticeId) {
        noticeService.deleteNotice(noticeId);
        return ResponseEntity.noContent().build();
    }
}