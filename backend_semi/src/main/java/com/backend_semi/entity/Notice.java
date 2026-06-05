package com.backend_semi.entity;

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

    @Id //DB의 기본 키(PK) 설정.
    @GeneratedValue(strategy = GenerationType.AUTO) //@GeneratedValue는 ID값을 자동으로 생성(1, 2, 3...)해줌.
    @Column(name = "notice_id")
    private Long noticeId;
    private String title;
    private String content;

    //카테고리 테이블과 연결 (다대일 관계)
    @ManyToOne
    @JoinColumn(name = "notice_category_id")
    private NoticeCategory noticeCategory;

    //회원 테이블과 연결 (다대일 관계)
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "is_important")
    private Boolean isImportant;

    private Integer viewCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    //첨부파일 처리를 위한 정보
    @Column(name = "attachment_url")
    private String attachmentUrl;
    @Column(length = 255)
    private String originalFileName;

}
