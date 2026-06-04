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

    // handlyCopy 함수의 매개변수인 text에 들어갈 내용이 activeContent
    // 조건식 : activeTab === "code"
    // 참이면 activeContent = currentLecture.code_example
    // 거짓이면 activeContent = currentLecture.code_description
    // 현재 선택된 탭에 따라 복사할 내용을 결정
    // 코드 예시 탭이면 code_example, 강의 내용 탭이면 code_description을 복사
    const activeContent = activeTab === "code"
        ? currentLecture.code_example
        : currentLecture.code_description;


    return (
        // 전체 컨텐츠 영역 : flex 세로 방향, 화면 전체 높이, 스크롤 숨김
        <div className="flex-fill d-flex flex-column p-4 gap-3 bg-light vh-100 overflow-hidden">

            {/* 1. 파일 경로 목록 + 수정/삭제 버튼 영역 */}
            {/* justify-content-between : 왼쪽엔 경로, 오른쪽엔 버튼 배치 */}
            <nav className="d-flex justify-content-between align-items-center" style={{ fontSize: "14px" }}>
                {/* 왼쪽 : 강의실 > 카테고리 > 강의명 경로 표시 */}
                <div className="text-muted fw-medium">
                    강의실 &gt; <span className="text-primary">{currentLecture.category}</span> &gt; {currentLecture.name}
                </div>

                {/* 오른쪽 : LecturePage에서 props로 받은 수정/삭제 버튼 */}
                <div className="d-flex gap-2">
                    {makeAdminButtons(currentLecture, navigate)}
                </div>
            </nav>


            {/* 2. 상단 파일 이름 / 강의 설명 영역 */}
            {/* rounded-4 : 모서리 둥글게 / shadow-sm : 약한 그림자 */}
            <div className="bg-white p-4 rounded-4 border d-flex justify-content-between align-items-center shadow-sm">
                <div className="d-flex gap-3 align-items-start">
                    {/* 왼쪽 아이콘 : </> 기호를 파란 배경 박스에 표시 */}
                    <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px", fontSize: "24px", flexShrink: 0 }}>
                        {/* </> 기호 표시 */}
                        &lt;/&gt;
                    </div>

                    <div>
                        {/* 강의 소주제 이름 (currentLecture.name) */}
                        <h2 className="fs-3 fw-bold text-dark mb-2">{currentLecture.name}</h2>
                        {/* 강의 설명 (currentLecture.lecture_description) */}
                        <div className="text-secondary fw-medium" style={{ lineHeight: "1.5" }}>
                            {currentLecture.lecture_description}
                        </div>
                    </div>
                </div>
                {/* 오른쪽 장식용 💻 이모지 (opacity-25 : 흐릿하게) */}
                <div className="fs-1 opacity-25 me-3">💻</div>
            </div>

            {/* 3. 메인 컨텐츠 영역 (좌2 : 우1 비율) */}
            <div className="d-flex gap-4 flex-fill overflow-hidden">

                {/* 왼쪽 (코드 & 설명 통합 탭 블록) */}
                <div className="bg-white rounded-4 border shadow-sm overflow-hidden d-flex flex-column" style={{ flex: 2 }}>

                    {/* 탭 버튼 */}
                    <div className="d-flex border-bottom bg-light align-items-center">
                        {/* 코드 예시 탭 버튼 */}
                        {/* activeTab이 "code"면 파란 글씨 + 파란 하단 보더, 아니면 회색 글씨 */}
                        <button
                            onClick={() => setActiveTab("code")}
                            className={`btn flex-fill rounded-0 py-3 fw-bold ${activeTab === "code" ? "text-primary border-bottom border-3 border-primary" : "text-muted"}`}>
                            🖥️ 코드 예시
                        </button>

                        {/* 강의 내용 탭 버튼 */}
                        {/* activeTab이 "description"면 파란 글씨 + 파란 하단 보더, 아니면 회색 글씨 */}
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`btn flex-fill rounded-0 py-3 fw-bold ${activeTab === "description" ? "text-primary border-bottom border-3 border-primary" : "text-muted"}`}>
                            📖 강의 내용 (코드 설명)
                        </button>

                        {/* 복사 버튼 : 현재 탭의 내용(activeContent)을 클립보드에 복사 */}
                        <button
                            onClick={() => handleCopy(activeContent)}
                            className="btn btn-outline-secondary btn-sm me-2"
                            style={{ whiteSpace: "nowrap" }}
                            title="클립보드에 복사">
                            📋 복사
                        </button>
                    </div>



                    {/* 탭 내용 바디 : overflow-auto로 내용이 길면 스크롤 */}
                    <div className="flex-fill overflow-auto p-4">

                        {/* 코드 예시 탭이 선택된 경우 */}
                        {activeTab === "code" ? (
                            <div className="d-flex flex-column h-100 gap-2">
                                {/* 언어 표시 라벨 (예: TYPESCRIPT) (삭제 고민) */}
                                <div className="bg-light border border-bottom-0 rounded-top p-2 px-3 text-muted" style={{ fontSize: "14px" }}>
                                    <span>📄 {currentLecture.language?.toUpperCase()}</span>
                                </div>
                                {/* 코드 하이라이터로 code_example 표시 */}
                                <div className="border rounded-bottom p-3 bg-white flex-fill">
                                    <SyntaxHighlighter
                                        language={currentLecture.language?.toLowerCase()}
                                        style={getThemeByLanguage(currentLecture.language || "")}
                                        customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "14px", lineHeight: "1.6" }}>
                                        {currentLecture.code_example}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        ) : (
                            /* 강의 내용 탭이 선택된 경우 */
                            <div className="d-flex flex-column h-100 gap-2">
                                {/* 언어 표시 라벨 (삭제 고민) */}
                                <div className="bg-light border border-bottom-0 rounded-top p-2 px-3 text-muted" style={{ fontSize: "14px" }}>
                                    <span>📄 {currentLecture.language?.toUpperCase()}</span>
                                </div>
                                {/* 코드 하이라이터로 code_description 표시 */}
                                <div className="border rounded-bottom p-3 bg-white flex-fill">
                                    <SyntaxHighlighter
                                        language={currentLecture.language?.toLowerCase()}
                                        style={getThemeByLanguage(currentLecture.language || "")}
                                        customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "14px", lineHeight: "1.6" }}>
                                        {currentLecture.code_description}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* 오른쪽 : 구현 화면 iframe 블록 (flex: 1) */}
                <div className="bg-white rounded-4 border shadow-sm d-flex flex-column" style={{ flex: 1 }}>
                    {/* 구현 화면 헤더 : 제목 + 새 창 열기 링크 */}
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-dark">🖥️ 구현 화면</span>
                        {/* 새 창 열기 : target="_blank"로 새 탭에서 iframe_url 열기 */}
                        <a href={currentLecture.iframe_url} target="_blank" rel="noreferrer"
                            className="text-primary text-decoration-none fw-bold" style={{ fontSize: "13px" }}>
                            새 창 열기 ↗
                        </a>
                    </div>

                    {/* iframe 컨테이너 : position-relative로 iframe 위치 기준점 설정 */}
                    <div className="flex-fill overflow-hidden position-relative">
                        {/* iframe : scale(0.67)로 축소해서 한눈에 보이게
                            width/height를 150%로 키우고 scale로 0.67배 줄이면
                            실제로 100% 크기처럼 보이면서 내용은 축소되어 한눈에 보임
                            sandbox : 보안 설정 (스크립트 허용, 같은 출처 허용) */}
                        <iframe
                            src={currentLecture.iframe_url}
                            style={{
                                width: "150%",
                                height: "150%",
                                border: "none",
                                transform: "scale(0.67)",
                                transformOrigin: "top left",
                            }}
                            title="preview"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LectureContent;