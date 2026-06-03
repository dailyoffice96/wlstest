import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; 
import LectureContent from "./LectureContent"; 
import type { Lecture } from "../../types/Lecture";
import axios from "axios"; // 회원님이 사용하시는 axios 라이브러리 그대로 두시면 됩니다.

function LecturePage() {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

    // 💡 1. 백엔드 데이터 페칭 로직
    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/lectures"); 
                setLectures(response.data);
            } catch (error) {
                console.error("강의 목록 로딩 실패:", error);
            }
        };
        fetchLectures();
    }, []);

    // 💡 2. 브라우저 전체 스크롤 방지 로직 (안쪽 내용물만 스크롤 되도록)
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset"; 
        };
    }, []);

    return (
        // 🔥 핵심: App.tsx를 안 건드리는 대신, 이 컴포넌트가 상단바 아래 남은 공간을 통째로 먹도록 강제합니다.
        <div className="lecture-page-container" style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            // 💡 상단바가 차지하고 남은 공간을 어떤 해상도에서든 브라우저가 알아서 100% 꽉 채우게 만듭니다.
            height: "calc(100vh - window.scrollY)", 
            flexGrow: 1,
            // 만약 부모(App.tsx)가 flex 구조가 아닐 경우를 대비해 안전하게 남은 높이를 채우는 트릭입니다.
            minHeight: "0", 
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
        }}>
            {/* 왼쪽 사이드바 목차 영역 */}
            <Sidebar 
                lectures={lectures} 
                setCurrentLecture={setCurrentLecture} 
                currentLecture_id={currentLecture ? currentLecture.id : null} 
            />

            {/* 오른쪽 메인 컨텐츠 영역 */}
            <LectureContent currentLecture={currentLecture} />
        </div>
    );
}

export default LecturePage;