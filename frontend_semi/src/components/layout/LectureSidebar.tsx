import { useEffect, useState } from "react";
import type { Lecture } from "../../types/Lecture";
import type { User } from "../../types/User";
import type { Favorite } from "../../types/Favorite";
import { useNavigate } from "react-router-dom";
import customAxios from "../../api/axiosInstance";
import "./LectureSidebar.css";

interface LectureSidebarProps {
    lectures: Lecture[];
    setCurrentLecture: (lecture: Lecture) => void;
    currentLecture_id: number | null;
    user: User | null;
}

function LectureSidebar({
    lectures,
    setCurrentLecture,
    currentLecture_id,
    user,
}: LectureSidebarProps) {
    const navigate = useNavigate();

    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const groupedLectures = lectures.reduce<Record<string, Lecture[]>>(
        (acc, lecture) => {
            const categoryName = lecture.category || "기타";

            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }

            acc[categoryName].push(lecture);

            return acc;
        },
        {}
    );

    const sortedCategoryNames = Object.keys(groupedLectures);

    sortedCategoryNames.forEach((categoryName) => {
        groupedLectures[categoryName].sort((a, b) => a.id - b.id);
    });

    useEffect(() => {
        getFavorites();
    }, []);

    /*
      중요:
      첫 번째 대주제를 자동으로 여는 useEffect는 제거했다.
      이제 기본으로 열리는 폴더는 없다.
      단, lectureId 쿼리로 외부에서 들어온 경우에는 해당 강의의 대주제만 자동으로 열린다.
    */
    useEffect(() => {
        if (!currentLecture_id) {
            return;
        }

        const selectedLecture = lectures.find(
            (lecture) => lecture.id === currentLecture_id
        );

        if (!selectedLecture) {
            return;
        }

        const selectedCategory = selectedLecture.category || "기타";

        setOpenCategories({
            [selectedCategory]: true,
        });
    }, [currentLecture_id, lectures]);

    const getFavorites = async () => {
        try {
            const response = await customAxios.get("/api/favorites/me");

            setFavorites(response.data || []);
        } catch (error) {
            console.error("즐겨찾기 목록 조회 실패:", error);
        }
    };

    const toggleCategory = (categoryName: string) => {
        setOpenCategories((prev) => {
            const isCurrentlyOpen = !!prev[categoryName];

            if (isCurrentlyOpen) {
                return {};
            }

            return {
                [categoryName]: true,
            };
        });
    };

    const makeFavoriteUrl = (lectureId: number) => {
        return `/api/lecture/list?lectureId=${lectureId}`;
    };

    const findFavoriteByLectureId = (lectureId: number) => {
        const favoriteUrl = makeFavoriteUrl(lectureId);

        return favorites.find((favorite) => favorite.favoriteUrl === favoriteUrl);
    };

    const toggleFavorite = async (
        event: React.MouseEvent<HTMLButtonElement>,
        lecture: Lecture
    ) => {
        event.stopPropagation();

        const existingFavorite = findFavoriteByLectureId(lecture.id);

        try {
            if (existingFavorite) {
                await customAxios.delete(
                    `/api/favorites/${existingFavorite.favoriteId}`
                );

                setFavorites((prev) =>
                    prev.filter(
                        (favorite) =>
                            favorite.favoriteId !== existingFavorite.favoriteId
                    )
                );

                return;
            }

            const response = await customAxios.post("/api/favorites", {
                favoriteUrl: makeFavoriteUrl(lecture.id),
            });

            setFavorites((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("즐겨찾기 처리 실패:", error);
            alert("즐겨찾기 처리에 실패했습니다.");
        }
    };

    const saveLectureProgress = async (lectureId: number) => {
        try {
            await customAxios.post(`/api/lecture/list/progress/${lectureId}`);
        } catch (error) {
            console.error("학습 기록 저장 실패:", error);
        }
    };

    const handleSelectLecture = async (lecture: Lecture) => {
        const selectedCategory = lecture.category || "기타";

        setOpenCategories({
            [selectedCategory]: true,
        });

        setCurrentLecture(lecture);

        await saveLectureProgress(lecture.id);
    };

    return (
        <aside className="lecture-sidebar">
            <div className="sidebar-dom sidebar-dom1">
                <div className="lecture-sidebar-header">
  <div className="lecture-sidebar-title-row">
    <div className="lecture-sidebar-title-icon">💻</div>
    <h2 className="lecture-sidebar-title">강의 목록</h2>
  </div>

  <p className="lecture-sidebar-subtitle">
    대주제를 열고 원하는 강의를 선택하세요.
  </p>
</div>
            </div>

            <div className="sidebar-dom sidebar-dom2">
                {sortedCategoryNames.length === 0 ? (
                    <div className="lecture-sidebar-empty">
                        등록된 강의가 없습니다.
                    </div>
                ) : (
                    sortedCategoryNames.map((categoryName) => {
                        const isOpen = !!openCategories[categoryName];

                        return (
                            <div
                                key={categoryName}
                                className={
                                    isOpen
                                        ? "lecture-category open"
                                        : "lecture-category"
                                }
                            >
                                <button
                                    type="button"
                                    className="lecture-category-button"
                                    onClick={() => toggleCategory(categoryName)}
                                >
                                    <span className="lecture-category-arrow">
                                       { isOpen ? "▾" : "▸"}
                                    </span>
                                     <span>🗂️</span>   
                                    <span className="lecture-category-name">
                                        {categoryName}
                                    </span>

                                    <span className="lecture-category-count">
                                        {groupedLectures[categoryName].length}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="lecture-list">
                                        {groupedLectures[categoryName].map(
                                            (lecture) => {
                                                const isActive =
                                                    lecture.id === currentLecture_id;

                                                const favorite =
                                                    findFavoriteByLectureId(
                                                        lecture.id
                                                    );

                                                return (
                                                    <button
                                                        key={lecture.id}
                                                        type="button"
                                                        className={
                                                            isActive
                                                                ? "lecture-item active"
                                                                : "lecture-item"
                                                        }
                                                        onClick={() =>
                                                            handleSelectLecture(lecture)
                                                        }
                                                    >
                                                        <div className="lecture-item-row">
                                                            <span className="lecture-item-title">
                                                             ㄴ🧩{lecture.name}
                                                            </span>

                                                            <span className="lecture-item-right">
                                                                {isActive && (
                                                                    <span className="lecture-active-mark">
                                                                        현재
                                                                    </span>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    className={
                                                                        favorite
                                                                            ? "lecture-favorite-button filled"
                                                                            : "lecture-favorite-button empty"
                                                                    }
                                                                    onClick={(event) =>
                                                                        toggleFavorite(
                                                                            event,
                                                                            lecture
                                                                        )
                                                                    }
                                                                    title={
                                                                        favorite
                                                                            ? "즐겨찾기 해제"
                                                                            : "즐겨찾기 등록"
                                                                    }
                                                                >
                                                                    {favorite
                                                                        ? "★"
                                                                        : "☆"}
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {user?.role === "ADMIN" && (
                <div className="sidebar-dom sidebar-dom3">
                    <button
                        type="button"
                        className="lecture-create-button"
                        onClick={() => navigate("/api/lecture/insert")}
                    >
                        + 새 글 작성
                    </button>
                </div>
            )}
        </aside>
    );
}

export default LectureSidebar;