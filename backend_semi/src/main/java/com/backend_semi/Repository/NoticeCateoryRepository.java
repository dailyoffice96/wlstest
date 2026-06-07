package com.backend_semi.Repository;


import com.backend_semi.entity.NoticeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeCateoryRepository extends JpaRepository<NoticeCategory, Long> {
}
