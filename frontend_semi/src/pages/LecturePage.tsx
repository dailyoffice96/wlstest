import { useEffect, useState } from "react";
import axios from "axios";
import type { Lecture } from "../types/Lecture";
import { API_BASE_URL } from "../config/config";
import Sidebar from "../components/layout/Sidebar";
import LectureContent from "../components/LecturePage/LectureContent";


function LecturePage() {
    // 백엔드(LectureController)에서 응답할 데이터인 List<Lecture> lectures을 넣을 state 변수
    const [lectures, setLectures] = useState<Lecture[]>([]);
    // 현재 선택된 강의를 넣을 state 변수 -> 사이드바 하이라이트 / 컨텐츠 내용 표시 / 구현 화면 표시에 사용
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

    useEffect(() => {
        const url = `${API_BASE_URL}/lecture/list`;
        axios.get(url)
            .then((response) => {
                setLectures(response.data);

                // 처음 강의실 들어갈때 기본으로 보여줄 화면은 가장 초기의 강의여서
                // 가져온 강의 리스트의 가장 첫번째인 [0]을 현재 강의로 넣음
                if (response.data.length > 0) {
                    setCurrentLecture(response.data[0]);
                }
            })

            .catch((err) => {
                console.error("데이터 통신 에러:", err);
            });
    }, []);

    return (
        <div className="lecture-page-container" style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>

            {/* 하단 메인 레이아웃 구역 */}
            <div className="lecture-content-body" style={{
                display: "flex",
                height: "calc(100vh - 106px)",
                width: "100%",
                overflow: "hidden"
            }}>

                {/* 왼쪽 사이드바 */}
                <Sidebar
                    lectures={lectures}
                    setCurrentLecture={setCurrentLecture}
                    currentLecture_id={currentLecture?.id || null}
                />

                {/* 우측 강의 상세 내용 영역 (컴포넌트로 깔끔하게 대체) */}
                {/* 💡 현재 선택된 강의 데이터를 Props로 넘겨줍니다. */}
                <LectureContent currentLecture={currentLecture} />

            </div>
        </div>
    );
}

export default LecturePage;