package com.backend_semi.dto;

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
    private String categoryName;
    private String authorName;
    private Boolean isImportant;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String attachmentUrl;

}
