import type { JSX } from "react";
import { useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors, prism, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";


interface LecturePageProps {
    currentLecture: Lecture | null;
    makeAdminButtons: (currentLecture: Lecture, navigate: any) => JSX.Element;
}

function LectureContent({ currentLecture, makeAdminButtons }: LecturePageProps) {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"code" | "description">("code");

    const getThemeByLanguage = (language: string) => {
        // enum파일로 language를 설정해놓아서 그럴일은 없지만 혹시모르니까 기본값을 설정함
        // language 값이 없으면 기본값은 인텔리제이 테마로 설정
        if (!language) return prism;

        switch (language.toLowerCase()) {
            case "java": return prism; // java(스프링)는 인텔리제이 테마
            case "typescript": return vs; // typescript(리액트)는 Visual Studio Code 테마
            case "sql": return ghcolors; // SQL(MySQL)은 MySQL Workbench 테마
            default: return prism; // 기본값은 인텔리제이 테마
        }
    };

    // 복사하기 버튼 클릭 시 동작하는 함수
    // navigator.clipboard.writeText() : 매개변수로 받은 text를 클립보드에 복사
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("복사되었습니다!");
    };

    if (!currentLecture) { // currentLecture가 자동으로 설정되지만 혹시모를경우를 대비해서 설정함
        return (
            <div className="flex-fill d-flex align-items-center justify-content-center bg-light text-muted h-100">
                강의실 목차에서 학습할 강의를 선택해 주세요.
            </div>
        );
    }



    return (
        <div className="flex-fill d-flex flex-column p-4 gap-3 bg-light vh-100 overflow-hidden">

            {/* 1. 맨 위 Breadcrumb 경로 및 수정/삭제 버튼 */}
            <nav className="d-flex justify-content-between align-items-center" style={{ fontSize: "14px" }}>
                <div className="text-muted fw-medium">
                    강의실 &gt; <span className="text-primary">{currentLecture.category}</span> &gt; {currentLecture.name}
                </div>
                <div className="d-flex gap-2">
                    {makeAdminButtons(currentLecture, navigate)}
                </div>
            </nav>


            {/* 2. 상단 정보 영역 블록 (메타 데이터 라인 삭제 완료) */}
            <div className="bg-white p-4 rounded-4 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex gap-3 align-items-start">
                    {/* 아이콘 */}
                    <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                        &lt;/&gt;
                    </div>
                    {/* 타이틀(name) 및 강의 설명(lecture_description) */}
                    <div>
                        <h2 className="fs-3 fw-bold text-dark mb-2">{currentLecture.name}</h2>
                        <div className="text-secondary fw-medium" style={{ lineHeight: "1.5" }}>
                            {currentLecture.lecture_description}
                        </div>
                    </div>
                </div>
                <div className="fs-1 opacity-25 me-3">💻</div>
            </div>

            {/* 3. 메인 컨텐츠 영역 (2:1 비율 분할) */}
            <div className="d-flex gap-4 flex-fill overflow-hidden">

                {/* 왼쪽 (코드 & 설명 통합 탭 블록) */}
                <div className="bg-white rounded-4 border shadow-sm overflow-hidden d-flex flex-column" style={{ flex: 2 }}>
                    {/* 탭 버튼 */}
                    <div className="d-flex border-bottom bg-light">
                        <button onClick={() => setActiveTab("code")} className={`btn flex-fill rounded-0 py-3 fw-bold ${activeTab === "code" ? "text-primary border-bottom border-3 border-primary" : "text-muted"}`}>
                            🖥️ 코드 예시
                        </button>
                        <button onClick={() => setActiveTab("description")} className={`btn flex-fill rounded-0 py-3 fw-bold ${activeTab === "description" ? "text-primary border-bottom border-3 border-primary" : "text-muted"}`}>
                            📖 강의 내용 (코드 설명)
                        </button>
                    </div>

                    {/* 내용 바디 */}
                    <div className="flex-fill overflow-auto p-4">
                        {activeTab === "code" ? (
                            <div className="d-flex flex-column h-100 gap-2">
                                <div className="bg-light border border-bottom-0 rounded-top p-2 px-3 text-muted" style={{ fontSize: "14px" }}>
                                    <span>📄 {currentLecture.language?.toUpperCase()}</span>
                                </div>
                                <div className="border rounded-bottom p-3 bg-white flex-fill">
                                    <SyntaxHighlighter
                                        language={currentLecture.language?.toLowerCase()}
                                        style={getThemeByLanguage(currentLecture.language || "")}
                                        customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "14px", lineHeight: "1.6" }}
                                    >
                                        {currentLecture.code_example}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        ) : (
                            /* 강의 내용 탭: 상세 설명 및 핵심 포인트만 출력 */
                            <div className="d-flex flex-column gap-4">
                                {/* 상세 설명 */}
                                <SyntaxHighlighter
                                    language={currentLecture.language?.toLowerCase()}
                                    style={getThemeByLanguage(currentLecture.language || "")}
                                    customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "14px", lineHeight: "1.6" }}
                                >
                                    {currentLecture.code_example}
                                </SyntaxHighlighter>

                            </div>
                        )}
                    </div>
                </div>


                {/* 오른쪽 (구현 화면 브라우저 창) */}
                <div className="bg-white rounded-4 border shadow-sm d-flex flex-column" style={{ flex: 1 }}>
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-dark d-flex align-items-center gap-2">🖥️ 구현 화면</span>
                        <a href={currentLecture.iframe_url} target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-bold" style={{ fontSize: "13px" }}>
                            새 창 열기 ↗
                        </a>
                    </div>

                    {/* iframe */}
                    <iframe
                        src={currentLecture.iframe_url}
                        className="w-100 flex-fill border-0 bg-white"
                        title="preview"

                    />
                </div>

            </div>
        </div>
    );
}

export default LectureContent;