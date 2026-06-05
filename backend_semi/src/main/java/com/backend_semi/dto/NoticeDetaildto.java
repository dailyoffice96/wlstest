package com.backend_semi.dto;

import com.backend_semi.entity.Notice;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class NoticeDetaildto {
    private Long noticeId;
    private String title;
    private String content;
    private Long categoryId;
    private String categoryName;
    private String authorName;
    private Boolean isImportant;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String attachmentUrl;
    private String originalFileName;

    // 게시글 수정 혹은 등록 로직에서 사용되는 엔티티 변환 메서드
    public Notice toEntity() {
        Notice notice = new Notice();
        notice.setTitle(this.title);
        notice.setContent(this.content);
        notice.setIsImportant(this.isImportant);
        notice.setViewCount(0);
        notice.setCreatedAt(LocalDateTime.now());
        return notice;
    }

    //상세 조회 시 엔티티의 모든 정보를 DTO로 옮기는 메서드
    //화면에서 보여줘야 할 모든 필드(내용, 작성일, 수정일, 파일 등)를 포함
    public static NoticeDetaildto from(Notice notice) {
        NoticeDetaildto dto = new NoticeDetaildto();
        dto.setNoticeId(notice.getNoticeId());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());

        // 카테고리 ID와 이름 모두 매핑하여 상세 화면에서 필요 시 활용
        if (notice.getNoticeCategory() != null) {
            dto.setCategoryName(notice.getNoticeCategory().getCategoryName());
            dto.categoryId = notice.getNoticeCategory().getNoticeCategoryId();}

        // 작성자 이름 매핑
        if (notice.getMember() != null) {
            dto.setAuthorName(notice.getMember().getName());}


        dto.setIsImportant(notice.getIsImportant());
        dto.setViewCount(notice.getViewCount());
        dto.setCreatedAt(notice.getCreatedAt());
        dto.setUpdatedAt(notice.getUpdatedAt());

        // 파일 업로드 경로와 원본 파일명 매핑
        dto.setAttachmentUrl(notice.getAttachmentUrl());
        dto.setOriginalFileName(notice.getOriginalFileName());

        return dto;
    }
}
