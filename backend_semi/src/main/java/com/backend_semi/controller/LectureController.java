package com.backend_semi.controller;

import com.backend_semi.entity.Lecture;
import com.backend_semi.service.LectureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;


    // 프론트 사이드바와 강의실 내용에 대한 데이터를 보내기
    @GetMapping("/list")
    public List<Lecture> list(){
        List<Lecture> lectures = this.lectureService.getLectureList();
        return lectures;
    }

    // 강의 등록할때 사용하는 PostMapping
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@Valid @RequestBody Lecture lecture, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError xx : bindingResult.getFieldErrors()) {
                errors.put(xx.getField(), xx.getDefaultMessage());
            }

            return new ResponseEntity<>(
                    Map.of(
                            "message", "상품 등록 유효성 검사에 문제가 있습니다.",
                            "errors", errors
                    ),
                    HttpStatus.BAD_REQUEST
            );
        }

        try { // 성공하면
            // 이미지를 운영체제에 저장하고 상품의 이미지 컬럼에 값을 넣고 데이터베이스에 상품을 저장함
            Lecture savedLecture = this.lectureService.insertLecture(lecture);

            if (savedLecture == null) {
                return ResponseEntity
                        .status(500)
                        .body(
                                Map.of(
                                        "message", "강의 등록에 실패하였습니다.",
                                        "error", "bad image file format"
                                )
                        );
            }

            return ResponseEntity.ok(
                    Map.of(
                            "message", "강의가 성공적으로 등록되었습니다."
                    )
            );

        } catch (Exception err) { // 데이터 베이스 오류
            return ResponseEntity
                    .status(500)
                    .body(
                            Map.of(
                                    "message", err.getMessage(),
                                    "error", "Internet Server Error"
                            )
                    );
        }
    }

    // 강의 삭제할때 사용하는 DeleteMapping
    public ResponseEntity<String> delete(@PathVariable Long id){
        try {
            boolean isDeleted = this.lectureService.deleteLecture(id);

            if(isDeleted){ // isDeleted가 true면 삭제가 정상적으로 되었다는 뜻
                // 여기까지 왔다는 것은 에러없이 성공해서 내가 원하는 동작인 삭제가 된 것임
                return ResponseEntity.ok(id + "번 강의가 삭제되었습니다.");
            }else{ // 삭제를 할 강의 자체가 없는 상태
                return ResponseEntity.badRequest().body(id + "번 강의가 존재하지 않습니다.");
            }

        }catch (DataIntegrityViolationException err){// 데이터 베이스 무결성 위배되는 에러가 발생할때
            String message = "해당 강의의 무결성이 위배되었습니다." ;
            return ResponseEntity.internalServerError().body(message);

        }catch (Exception err){ // 두루뭉실한 예외처리
            return ResponseEntity.internalServerError().body("오류 발생 : " + err.getMessage());

        }

    }


}
