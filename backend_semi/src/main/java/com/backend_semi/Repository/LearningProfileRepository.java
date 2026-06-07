package com.backend_semi.Repository;

import com.backend_semi.entity.LearningProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningProfileRepository extends JpaRepository<LearningProfile, Long> {
}
