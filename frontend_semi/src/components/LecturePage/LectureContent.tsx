import { useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { ghcolors, prism, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";



// 💡 부모(LecturePage)로부터 전달받을 Props 규격을 정의합니다.
interface LecturePageProps {
    currentLecture: Lecture | null;
}

function LectureContent({ currentLecture }: LecturePageProps) {
    // 강의 내용에만 들어가는 tab이기에 여기에서 관리함
    // 강의 내용중에서 코드 예시와 코드 설명을 탭으로 나누어서 현재 표현하는 값을 넣기위한 state 변수
    // 기본값은 code로 설정함
    const [activeTab, setActiveTab] = useState<"code" | "description">("code");

    // 코드 예시와 코드 설명에 필요한 코드 테마를 적용하기 위한 함수
    const getThemeByLanguage = (language: string) => {
        // 해당 lecture에 language 컬럼 데이터가 존재하지 않을때 예외처리로 인텔리제이 테마 적용하고 콘솔창에 알리기
        if (!language) {
            console.log("language가 누락되었습니다.")
            return prism;
        }

        switch (language.toLowerCase()) {
            case "java":
                return prism;      // ☕ IntelliJ 오리지널 기본 라이트 테마
            case "typescript":
                return vs;         // 💙 VS Code 오리지널 기본 라이트 테마
            case "sql":
                return ghcolors;   // 🐬 MySQL Workbench 순정 흰색 스크립트 창 감성
            default:
                return vs;
        }
    }


    return (
        <main
            className="lecture-main-content"
            style={{
                flex: 1,
                padding: "30px",
                overflowY: "auto",
                backgroundColor: "#f8fafc",
            }}
        >
            {currentLecture ? ( // 삼항 연산자 사용 (조건식 ? 참일때 : 거짓일때) / currentLecture이 존재하면 참 아니면 거짓
                <div
                    className="lecture-detail-view"
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                    {/* 위쪽 구역: 파일명 및 학습목표 고정 배치 */}
                    <div
                        className="lecture-detail-header"
                        style={{
                            marginBottom: "24px",
                            background: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        {/* 대주제(카테고리) 태그 */}
                        <span
                            style={{
                                backgroundColor: "#e0f2fe",
                                color: "#0369a1",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            {currentLecture.category}
                        </span>

                        {/* 1. 소주제(파일이름)(name)을 가장 위에 배치 */}
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: "#1e293b",
                                marginTop: "8px",
                                marginBottom: "14px",
                            }}
                        >
                            📄 {currentLecture.name}
                        </h1>

                        {/* 2. 그 아래에 학습 목표(goal)를 고정으로 넓게 배치 */}
                        <div
                            className="goal-box"
                            style={{
                                fontSize: "14.5px",
                                lineHeight: "1.6",
                                color: "#334155",
                                background: "#f0fdf4",
                                padding: "14px 16px",
                                borderRadius: "8px",
                                borderLeft: "4px solid #16a34a",
                            }}
                        >
                            <b>🎯 학습 목표:</b> {currentLecture.lecture_goal}
                        </div>

                        {/* 아래쪽 구역: 2:1 분할 가로 레이아웃 그리드 */}
                        <div
                            className="lecture-grid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr",
                                gap: "24px",
                                flex: 1,
                                minHeight: 0,
                            }}
                        >
                            {/* 왼쪽 박스: 탭 시스템 (코드 예시 / 코드 설명) */}
                            <div
                                className="left-tab-container"
                                style={{
                                    background: "white",
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                }}
                            >
                                {/* 상단 탭 버튼 */}
                                <div
                                    className="tab-button-bar"
                                    style={{
                                        display: "flex",
                                        background: "#f8fafc",
                                        borderBottom: "1px solid #e2e8f0",
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveTab("code")}
                                        style={{
                                            flex: 1,
                                            padding: "14px",
                                            border: "none",
                                            background: activeTab === "code" ? "white" : "transparent",
                                            fontWeight: activeTab === "code" ? "bold" : "normal",
                                            color: activeTab === "code" ? "#0753bf" : "#64748b",
                                            borderBottom: activeTab === "code" ? "2px solid #0753bf" : "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        코드 예시
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("description")}
                                        style={{
                                            flex: 1,
                                            padding: "14px",
                                            border: "none",
                                            background: activeTab === "description" ? "white" : "transparent",
                                            fontWeight: activeTab === "description" ? "bold" : "normal",
                                            color: activeTab === "description" ? "#0753bf" : "#64748b",
                                            borderBottom: activeTab === "description" ? "2px solid #0753bf" : "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        코드 설명
                                    </button>
                                </div>

                                {/* 하단 데이터 출력 바디 */}
                                <div
                                    className="tab-content-body"
                                    style={{ padding: "20px", flex: 1, overflowY: "auto" }}
                                >
                                    {activeTab === "code" && (
                                        <SyntaxHighlighter
                                            language={currentLecture.language} // 스프링 DB의 language 값 연동
                                            style={getThemeByLanguage(currentLecture.language)} // 툴별 매칭 함수 연동
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: "8px",
                                                fontSize: "13.5px",
                                                height: "100%",
                                                background: "white",           // 코드 배경 화이트 고정
                                                border: "1px solid #cbd5e1",   // 깔끔하게 외곽 테두리 선 추가
                                            }}
                                        >
                                            {currentLecture.code_example}
                                        </SyntaxHighlighter>
                                    )}

                                    {activeTab === "description" && (
                                        <SyntaxHighlighter
                                            language={currentLecture.language} // 코드 예시 탭과 똑같이 DB의 language 값을 그대로 사용!
                                            style={getThemeByLanguage(currentLecture.language)} // 테마도 똑같이 연동
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: "8px",
                                                fontSize: "13.5px",
                                                height: "100%",
                                                background: "#f1f5f9", // 배경색은 설명 탭만의 구분점으로 유지
                                                border: "1px solid #cbd5e1",
                                                whiteSpace: "pre-wrap",
                                                fontFamily: "Malgun Gothic",
                                            }}
                                        >
                                            {currentLecture.code_description}
                                        </SyntaxHighlighter>
                                    )}
                                </div>
                            </div>

                            {/* ----------------- [오른쪽 박스: 결과 브라우저 iframe 고정 구역] ----------------- */}
                            <div
                                className="right-preview-container"
                                style={{
                                    background: "white",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        marginBottom: "12px",
                                        color: "#0753bf",
                                    }}
                                >
                                    🖥️ 구현 화면
                                </h3>
                                <div
                                    className="browser-mockup"
                                    style={{
                                        flex: 1,
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        className="browser-header"
                                        style={{
                                            background: "#f1f5f9",
                                            padding: "8px",
                                            display: "flex",
                                            gap: "6px",
                                            borderBottom: "1px solid #cbd5e1",
                                        }}
                                    >
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></span>
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }}></span>
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></span>
                                    </div>
                                    <iframe
                                        src={currentLecture.iframe_url}
                                        title="실습 결과 화면"
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "#64748b",
                    }}
                >
                    강의 목록을 불러오는 중입니다...
                </div>
            )}
        </main>
    );
}

export default LectureContent;