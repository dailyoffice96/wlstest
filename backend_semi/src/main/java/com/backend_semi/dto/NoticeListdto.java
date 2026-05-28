package com.backend_semi.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class NoticeListdto {
    private Long noticeId;
    private String title;
    private String categoryName;
    private String authorName;
    private Boolean isImportant;
    private Integer viewCount;
    private LocalDateTime createdAt;

}
