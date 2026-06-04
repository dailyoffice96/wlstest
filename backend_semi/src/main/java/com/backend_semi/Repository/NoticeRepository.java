package com.backend_semi.Repository;

import com.backend_semi.Entity.Notice;
import com.backend_semi.Entity.NoticeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 중요공지 조회
    List<Notice> findByIsImportantTrue();

    // 카테고리명으로 조회
    List<Notice> findByNoticeCategory_CategoryName(String categoryName);

}
