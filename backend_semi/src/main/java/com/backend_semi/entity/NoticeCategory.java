package com.backend_semi.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "notice_categories")
public class NoticeCategory {

    @Id//DB의 기본 키(PK) 설정.
    @GeneratedValue(strategy = GenerationType.AUTO)//@GeneratedValue는 ID값을 자동으로 생성(1, 2, 3...)해줌.
    @Column(name = "notice_category_id")
    private Long noticeCategoryId;

    @Column(name = "category_name")
    private String categoryName;
}
