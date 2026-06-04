package com.backend_semi.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Table(name = "notices")
@Entity
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notice_id")
    private Long noticeId;

    @ManyToOne
    @JoinColumn(name = "notice_category_id")
    private NoticeCategory noticeCategory;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;
    private String content;

    @Column(name = "is_important")
    private Boolean isImportant;

    private Integer viewCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "attachment_url")
    private String attachmentUrl;
}
