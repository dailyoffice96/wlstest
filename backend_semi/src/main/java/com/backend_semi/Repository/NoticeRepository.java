package com.backend_semi.repository;

import com.backend_semi.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 중요 공지만 필터링하여 페이징 조회
    Page<Notice> findByIsImportantTrue(Pageable pageable);

    // 카테고리 ID로 공지 목록 조회
    Page<Notice> findByNoticeCategory_NoticeCategoryId(Long categoryId, Pageable pageable);

    // 제목 검색(관련 키워드가 포함된 모든 게시글 찾기))
    Page<Notice> findByTitleContaining(String keyword, Pageable pageable);

    // 내용 검색
    Page<Notice> findByContentContaining(String keyword, Pageable pageable);

    // 작성자 검색
    Page<Notice> findByMember_NameContaining(String keyword, Pageable pageable);

    // 전체(제목 + 내용) 검색
    Page<Notice> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);
}
