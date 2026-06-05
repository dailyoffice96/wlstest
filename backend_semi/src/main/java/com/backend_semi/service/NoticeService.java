package com.backend_semi.service;

import com.backend_semi.entity.Member;
import com.backend_semi.repository.MemberRepository;
import com.backend_semi.constant.Role;
import com.backend_semi.repository.NoticeRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.backend_semi.entity.Notice;
import com.backend_semi.entity.NoticeCategory;
import com.backend_semi.repository.NoticeCategoryRepository;
import com.backend_semi.dto.NoticeDetaildto;
import com.backend_semi.dto.NoticeListdto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeCategoryRepository noticeCategoryRepository;
    private final FileStorageService fileStorageService;
    private final MemberRepository memberRepository;

    // 공지사항 전체 목록을 페이징 처리하여 조회
    // readOnly = true: 데이터 조회만 수행하므로 DB 성능 최적화를 위해 설정
    @Transactional(readOnly = true)
    public Page<NoticeListdto> getNoticeList(int page, int size) {
        // PageRequest: page(페이지번호), size(개수), Sort(정렬기준: 최신순) 설정
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "noticeId"));
        Page<Notice> notices = noticeRepository.findAll(pageable);

        // Entity 리스트를 DTO 리스트로 변환하여 반환
        return notices.map(NoticeListdto::from);
    }

    // 공지사항 상세 조회 및 조회수 증가
    @Transactional
    public NoticeDetaildto getNoticeDetail(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new RuntimeException("공지사항이 없습니다."));

        // 글을 읽을 때마다 조회수 증가 처리
        notice.setViewCount(notice.getViewCount() + 1);
        noticeRepository.save(notice);

        return NoticeDetaildto.from(notice);
    }

    // 중요 공지만 필터링하여 조회
    @Transactional(readOnly = true)
    public Page<NoticeListdto> getImportantNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "noticeId"));
        return noticeRepository.findByIsImportantTrue(pageable)
                .map(NoticeListdto::from);
    }

    // 카테고리 ID가 2번인 '업데이트' 공지만 필터링하여 조회
    @Transactional(readOnly = true)
    public Page<NoticeListdto> getUpdateNotices(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "noticeId"));
        return noticeRepository.findByNoticeCategory_NoticeCategoryId(2L, pageable)
                .map(NoticeListdto::from);
    }

    // [보안/인증] 현재 로그인한 회원의 정보를 가져오는 메서드
    private Member getLoginMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long memberId = (Long) authentication.getPrincipal();

        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
    }

    // [권한체크] 관리자(ADMIN) 권한인지 확인, 아니면 예외 발생
    private void checkAdmin(Member member) {
        if (member.getRole() != Role.ADMIN) {
            throw new RuntimeException("관리자만 가능합니다.");}
    }

    // 공지사항 생성 로직
    public NoticeListdto createNotice(NoticeListdto dto, MultipartFile file) {
        Member loginMember = getLoginMember();
        checkAdmin(loginMember); // 관리자만 생성 가능

        Notice notice = dto.toEntity();
        NoticeCategory category = noticeCategoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("카테고리가 없습니다."));

        notice.setNoticeCategory(category);

        // 파일 업로드 처리
        if (file != null && !file.isEmpty()) {
            try {
                String savedPath = fileStorageService.upload(file);
                notice.setAttachmentUrl(savedPath);
                notice.setOriginalFileName(file.getOriginalFilename());
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패: " + e.getMessage());
            }
        }

        Notice saved = noticeRepository.save(notice);
        return NoticeListdto.from(saved);
    }

    // 공지사항 수정 로직
    public NoticeDetaildto updateNotice(Long noticeId, NoticeDetaildto dto, MultipartFile file, boolean removeFile) {
        Member loginMember = getLoginMember();
        checkAdmin(loginMember); // 관리자만 수정 가능

        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new RuntimeException("공지사항이 없습니다."));

        // 카테고리 변경 시 처리
        if (dto.getCategoryId() != null) {
            NoticeCategory category = noticeCategoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("카테고리가 없습니다."));
            notice.setNoticeCategory(category);
        }

        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        notice.setIsImportant(dto.getIsImportant());
        notice.setUpdatedAt(LocalDateTime.now());

        // 파일 삭제 요청 시 처리
        if (removeFile) {
            notice.setAttachmentUrl(null);
            notice.setOriginalFileName(null);
        }

        // 새 파일 업로드 처리
        if (file != null && !file.isEmpty()) {
            try {
                String savedPath = fileStorageService.upload(file);
                notice.setAttachmentUrl(savedPath);
                notice.setOriginalFileName(file.getOriginalFilename());
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패: " + e.getMessage());
            }
        }

        Notice saved = noticeRepository.save(notice);
        return NoticeDetaildto.from(saved);
    }

    // 공지사항 삭제 로직
    public void deleteNotice(Long noticeId) {
        Member loginMember = getLoginMember();
        checkAdmin(loginMember); // 관리자만 수정 가능

        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new RuntimeException("게시글이 없습니다."));

        noticeRepository.delete(notice);
    }

    // 공지사항 검색 (type에 따라 검색 범위가 달라짐)
    @Transactional(readOnly = true)
    public Page<NoticeListdto> searchNotice(String type, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "noticeId"));
        Page<Notice> notices;

        // 사용자가 선택한 검색 유형에 따라 적절한 DB 조회 메서드 호출
        switch (type) {
            case "title":
                notices = noticeRepository.findByTitleContaining(keyword, pageable);
                break;
            case "content":
                notices = noticeRepository.findByContentContaining(keyword, pageable);
                break;
            case "author":
                notices = noticeRepository.findByMember_NameContaining(keyword, pageable);
                break;
            default: // 검색 유형 미지정 시 제목+내용 통합 검색
                notices = noticeRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
        }

        return notices.map(NoticeListdto::from);
    }
}