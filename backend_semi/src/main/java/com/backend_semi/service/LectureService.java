package com.backend_semi.service;

import com.backend_semi.entity.Lecture;
import com.backend_semi.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    // 프론트 사이드 바에 사용될 오름차순(과거순) 정렬된 과목들 가져오는 메소드
    // 프론트 강의실 화면에 사용될 데이터들을 가져오는 메소드
    public List<Lecture> getLectureList (){
        return this.lectureRepository.findLectureByOrderByIdAsc();
    }

    // 강의 등록에 관한 메소드
    public Lecture insertLecture(Lecture lecture){
        lecture.setCreated_at(LocalDate.now());
        System.out.println("서비스) 강의 등록 정보");
        System.out.println(lecture);

        return lectureRepository.save(lecture);
    }

    // 강의 삭제에 관한 메소드
    public boolean deleteLecture(Long id){
        Lecture lecture = lectureRepository.findById(id).orElse(null);

        if(lecture == null){
            return false;
        }

        lectureRepository.delete(lecture);
        return true;
    }

}
