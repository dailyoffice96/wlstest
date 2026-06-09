import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Lecture } from "../types/Lecture";
import LectureSidebar from "../components/layout/LectureSidebar";
import LectureContent from "../components/LecturePage/LectureContent";
import "./LecturePage.css";
import customAxios from "../api/axiosInstance";
import type { User } from "../types/User";

interface LecturePageProps {
    user: User | null;
}

function LecturePage({ user }: LecturePageProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLectureList();
    }, [location.search]);

    const getLectureList = async () => {
        try {
            setLoading(true);

            const response = await customAxios.get("/api/lecture/list");

            const lectureList: Lecture[] = response.data || [];

            setLectures(lectureList);

            if (lectureList.length === 0) {
                setCurrentLecture(null);
                return;
            }

            const params = new URLSearchParams(location.search);
            const lectureIdParam = params.get("lectureId");
            const lectureId = lectureIdParam ? Number(lectureIdParam) : null;

            if (lectureId !== null && !Number.isNaN(lectureId)) {
                const targetLecture = lectureList.find(
                    (lecture) => lecture.id === lectureId
                );

                if (targetLecture) {
                    setCurrentLecture(targetLecture);
                    return;
                }
            }

            setCurrentLecture((prevLecture) => {
                if (!prevLecture) {
                    return lectureList[0];
                }

                const stillExists = lectureList.find(
                    (lecture) => lecture.id === prevLecture.id
                );

                return stillExists || lectureList[0];
            });
        } catch (error) {
            console.error("강의 목록 조회 실패:", error);
            alert("강의 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleSetCurrentLecture = (lecture: Lecture) => {
        setCurrentLecture(lecture);

        navigate(`/api/lecture/list?lectureId=${lecture.id}`, {
            replace: false,
        });
    };

    const handleDeleteLecture = async (lectureId: number) => {
        const confirmDelete = window.confirm("정말 이 강의를 삭제하시겠습니까?");

        if (!confirmDelete) {
            return;
        }

        try {
            await customAxios.delete(`/api/lecture/delete/${lectureId}`);

            alert("강의가 삭제되었습니다.");

            navigate("/api/lecture/list", {
                replace: true,
            });

            await getLectureList();
        } catch (error) {
            console.error("강의 삭제 실패:", error);
            alert("강의 삭제에 실패했습니다.");
        }
    };

    const makeAdminButtons = (
        selectedLecture: Lecture,
        pageNavigate: ReturnType<typeof useNavigate>,
        loginUser: User | null
    ) => {
        if (loginUser?.role !== "ADMIN") {
            return null;
        }

        return (
            <div className="lecture-admin-buttons">
                <button
                    type="button"
                    className="lecture-admin-button edit"
                    onClick={() =>
                        pageNavigate(`/api/lecture/update/${selectedLecture.id}`)
                    }
                >
                    수정
                </button>

                <button
                    type="button"
                    className="lecture-admin-button delete"
                    onClick={() => handleDeleteLecture(selectedLecture.id)}
                >
                    삭제
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="lecture-page">
                <div className="lecture-main">
                    <div className="lecture-loading">강의 목록을 불러오는 중입니다.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="lecture-page">
            <LectureSidebar
                lectures={lectures}
                setCurrentLecture={handleSetCurrentLecture}
                currentLecture_id={currentLecture?.id || null}
                user={user}
            />

            <LectureContent
                currentLecture={currentLecture}
                makeAdminButtons={makeAdminButtons}
                user={user}
            />
        </div>
    );
}

export default LecturePage;