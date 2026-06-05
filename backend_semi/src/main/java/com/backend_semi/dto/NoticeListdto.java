package com.backend_semi.dto;

import com.backend_semi.entity.Notice;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class NoticeListdto {
    private Long noticeId;
    private String title;
    private String content;
    private Long categoryId;
    private String categoryName;
    private String authorName;
    private Boolean isImportant;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private boolean hasFile;
    private String attachmentUrl;
    private String originalFileName;

    // DTO 데이터를 Notice Entity로 변환
    // 회원 정보, 카테고리 정보는 Service에서 별도로 설정함
    public Notice toEntity() {
        Notice notice = new Notice();
        notice.setTitle(this.title);
        notice.setContent(this.content);
        notice.setIsImportant(this.isImportant);
        notice.setViewCount(0);
        notice.setCreatedAt(LocalDateTime.now());
        return notice;
    }

    //기본 생성자 매핑 (필요 시 확장)
    public NoticeListdto(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.title = notice.getTitle();
    }

    public static NoticeListdto from(Notice notice) {
        NoticeListdto dto = new NoticeListdto(notice);
        dto.noticeId = notice.getNoticeId();
        dto.title = notice.getTitle();
        dto.content = notice.getContent();

        // 카테고리 정보 매핑
        // Notice가 Category를 가지고 있다면 이름만 뽑아서 DTO에 저장함.
        if (notice.getNoticeCategory() != null) {
            dto.categoryName = notice.getNoticeCategory().getCategoryName();
        }

        // 작성자 정보 매핑
        // Notice에 회원 이름만 뽑아서 DTO에 저장함.
        if (notice.getMember() != null) {
            dto.authorName = notice.getMember().getName();
        }

        // 첨부파일 경로 저장
        // 상세조회 화면에서 다운로드 링크와 원본 파일명을 표시하기 위해 DTO에 전달함
        dto.attachmentUrl = notice.getAttachmentUrl();
        dto.originalFileName = notice.getOriginalFileName();

        // 첨부 파일 여부 판단(아이콘)
        dto.hasFile = notice.getAttachmentUrl() != null && !notice.getAttachmentUrl().isEmpty();

        return dto;
    }


}