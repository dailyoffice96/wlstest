package com.backend_semi.Repository;

import com.backend_semi.Entity.NoticeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeCategoryRepository extends  JpaRepository<NoticeCategory, Long> {
}
