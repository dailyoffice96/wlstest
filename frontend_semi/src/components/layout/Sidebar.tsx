import type { Lecture } from "../../types/Lecture";


// 💡 부모(LecturePage)가 내려줄 Props의 규격을 선언합니다.
interface LecturePageProps {
    lectures: Lecture[];                              // 전체 강의 목록 배열
    setCurrentLecture: (lecture: Lecture) => void;     // 강의 선택 시 부모 상태를 바꿀 함수
    currentLecture_id: number | null;                             // 현재 선택된 강의의 ID
}

function Sidebar({ lectures, setCurrentLecture, currentLecture_id }: LecturePageProps) {
    return (
        <aside
            className="lecture-sidebar"
            style={{
                width: "280px",
                background: "white",
                borderRight: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* 사이드바 상단 타이틀 구역 */}
            <div
                className="sidebar-header"
                style={{
                    padding: "24px 20px",
                    borderBottom: "1px solid #f1f5f9",
                }}
            >
                <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", margin: 0 }}>
                    📚 학습 목차
                </h2>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", marginBottom: 0 }}>
                    총 {lectures.length}개의 강의
                </p>
            </div>

            {/* 목차 리스트 구역 (스크롤 가능) */}
            <div
                className="sidebar-menu-list"
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                }}
            >
                {lectures.map((item) => {
                    // 반복문으로 item 매개변수에 넣어서 lectures 배열의 내용물들 꺼내며 확인하는데
                    // 현재 보여지는 강의(선택된/클릭된)의 id와 같은 id를 가진 item이 나오면
                    // 그 item을 selectedLecture 변수에 넣음
                    const selectedLecture = item.id === currentLecture_id;

                    return (
                        <div
                            key={item.id} // 반복되는 div의 PK같은 것 (구분하기 위해)
                            // 🌟 클릭하면 부모에게 선택한 강의를 currentLecture에 넣는 함수인 setCurrentLecture를 보냄
                            onClick={() => setCurrentLecture(item)}
                            style={{
                                padding: "14px 16px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                // 💡 활성화(selectedLecture) 상태에 따른 동적 스타일링
                                // 선택한 강의와 그렇지 않은 강의를 구분하기 위한 스타일링(표시)
                                background: selectedLecture ? "#eff6ff" : "transparent",
                                color: selectedLecture ? "#1d4ed8" : "#475569",
                                fontWeight: selectedLecture ? "bold" : "normal",
                                borderLeft: selectedLecture ? "4px solid #2563eb" : "4px solid transparent",
                            }}
                            // 마우스 올렸을 때 회색 음영 피드백 (간단한 인터랙션)
                            onMouseEnter={(e) => {
                                if (!selectedLecture) e.currentTarget.style.background = "#f8fafc";
                            }}
                            onMouseLeave={(e) => {
                                if (!selectedLecture) e.currentTarget.style.background = "transparent";
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

export default Sidebar;