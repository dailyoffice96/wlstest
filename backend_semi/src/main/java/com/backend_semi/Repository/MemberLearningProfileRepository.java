package com.backend_semi.Repository;

import com.backend_semi.entity.Member;
import com.backend_semi.entity.MemberLearningProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberLearningProfileRepository extends JpaRepository<MemberLearningProfile, Long> {
    void deleteByMember(Member member);
}
