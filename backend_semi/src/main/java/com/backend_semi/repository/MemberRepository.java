package com.backend_semi.repository;

import com.backend_semi.constant.Role;
import com.backend_semi.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);

    boolean existsByEmail(String email);

    //역할 확인 + 페이징
    Page<Member> findByRole(Role role, Pageable pageable);

    //아이디 검색 + 페이징
    Page<Member> findByLoginIdContaining(String keyword, Pageable pageable);

    //가입일자 확인
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);



}