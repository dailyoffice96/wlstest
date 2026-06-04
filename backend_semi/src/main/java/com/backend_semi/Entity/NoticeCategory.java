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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notice_category_id")
    private Long noticeCategoryId;

    @Column(name = "category_name")
    private String categoryName;
}
