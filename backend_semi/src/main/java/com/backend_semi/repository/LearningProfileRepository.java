package com.backend_semi.repository;

import com.backend_semi.entity.LearningProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LearningProfileRepository extends JpaRepository<LearningProfile, Long> {
}
