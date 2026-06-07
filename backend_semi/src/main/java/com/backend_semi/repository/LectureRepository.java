package com.backend_semi.repository;

import com.backend_semi.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long> {
    List<Lecture> findLectureByOrderByIdAsc();

}
