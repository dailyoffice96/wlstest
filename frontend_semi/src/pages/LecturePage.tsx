import { useEffect, useState } from "react";
import axios from "axios";
import type { Lecture } from "../types/Lecture";
import { API_BASE_URL } from "../config/config";
import Sidebar from "../components/layout/Sidebar";
import LectureContent from "../components/LecturePage/LectureContent";

function LecturePage() {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

    useEffect(() => {
        const url = `${API_BASE_URL}/lecture/list`;
        axios.get(url)
            .then((response) => {
                setLectures(response.data);
                if (response.data.length > 0) {
                    setCurrentLecture(response.data[0]);
                }
            })
            .catch((err) => {
                console.error("데이터 통신 에러:", err);
            });
    }, []);

    return (
        // 1. 전체 영역을 flex로 설정하여 브라우저 높이(100vh)를 확보합니다.
        <div className="d-flex vh-100 overflow-hidden">
            {/* 2. 메인 컨텐츠 영역에 flex: 1을 적용합니다. 
                상단바가 있다면 상단바를 제외한 '남은 공간 전체'를 알아서 채우게 됩니다. */}
            <Sidebar
                lectures={lectures}
                setCurrentLecture={setCurrentLecture}
                currentLecture_id={currentLecture?.id || null}
            />

            {/* 우측 강의 상세 내용 영역 */}
            <main className="flex-fill overflow-hidden">
                <LectureContent currentLecture={currentLecture} />
            </main>
        </div>
    );
}

export default LecturePage;