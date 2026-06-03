import { useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors, prism, vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface LectureContentProps {
    currentLecture: Lecture | null;
}

function LectureContent({ currentLecture }: LectureContentProps) {
    const [activeTab, setActiveTab] = useState<"code" | "description">("code");

    const getThemeByLanguage = (language: string) => {
        if (!language) return prism;
        switch (language.toLowerCase()) {
            case "java": return prism;
            case "typescript": return vs;
            case "sql": return ghcolors;
            case "html": case "css": case "javascript": return prism;
            default: return vs;
        }
    };

    if (!currentLecture) {
        return (
            <div style={{ flex: 1, padding: "40px", color: "#64748b", textAlign: "center", background: "#f8fafc", height: "100%" }}>
                강의실 목차에서 학습할 강의를 선택해 주세요.
            </div>
        );
    }

    return (
        <div className="lecture-content-wrapper" style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "24px",
            gap: "20px",
            // 💡 [수정된 사항]: 부모(LecturePage)에서 전체 화면 크기를 맞춰주었으므로, 여기서 이중 스크롤이 생기지 않도록 auto를 hidden으로 막아줍니다.
            // 이렇게 하면 안쪽에 있는 코드 창(left-side)만 독립적으로 스크롤됩니다.
            overflow: "hidden", 
            background: "#f8fafc", 
            boxSizing: "border-box"
        }}>
            
            {/* 1. 맨 위 Breadcrumb 경로 */}
            <div className="breadcrumb" style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>
                강의실 &gt; <span style={{ color: "#2563eb" }}>{currentLecture.category}</span> &gt; {currentLecture.name}
            </div>

            {/* 2. 상단 정보 영역 블록 (메타 데이터 라인 삭제 완료) */}
            <div className="content-header" style={{
                flexShrink: 0,
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
            }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    {/* 아이콘 */}
                    <div style={{
                        width: "50px",
                        height: "50px",
                        background: "#ebf5ff",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#2563eb"
                    }}>
                        &lt;/&gt;
                    </div>
                    {/* 타이틀(name) 및 강의 목표(lecture_goal) */}
                    <div>
                        <h2 style={{ fontSize: "26px", margin: "0 0 10px 0", fontWeight: "700", color: "#1e293b" }}>
                            {currentLecture.name}
                        </h2>
                        <div style={{ fontSize: "15px", color: "#475569", margin: 0, fontWeight: "500", lineHeight: "1.5" }}>
                            {currentLecture.lecture_goal}
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: "50px", opacity: 0.1, marginRight: "20px" }}>💻</div>
            </div>

            {/* 3. 메인 컨텐츠 영역 (2:1 비율 분할) */}
            <div className="content-body" style={{
                display: "flex",
                gap: "24px",
                flex: 1,
                minHeight: 0
            }}>

                {/* 왼쪽 (코드 & 설명 통합 탭 블록) */}
                <div className="left-side" style={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                }}>
                    {/* 탭 버튼 */}
                    <div style={{ flexShrink: 0, display: "flex", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                        <button onClick={() => setActiveTab("code")} style={{
                            flex: 1, padding: "16px", border: "none", background: "none", cursor: "pointer",
                            borderBottom: activeTab === "code" ? "3px solid #2563eb" : "none",
                            color: activeTab === "code" ? "#2563eb" : "#64748b",
                            fontWeight: activeTab === "code" ? "bold" : "500",
                            fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"
                        }}>
                            🖥️ 코드 예시
                        </button>
                        <button onClick={() => setActiveTab("description")} style={{
                            flex: 1, padding: "16px", border: "none", background: "none", cursor: "pointer",
                            borderBottom: activeTab === "description" ? "3px solid #2563eb" : "none",
                            color: activeTab === "description" ? "#2563eb" : "#64748b",
                            fontWeight: activeTab === "description" ? "bold" : "500",
                            fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"
                        }}>
                            📖 강의 내용 (코드 설명)
                        </button>
                    </div>

                    {/* 내용 바디 */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "24px", minHeight: 0 }}>
                        {activeTab === "code" ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
                                <div style={{ 
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    background: "#f1f5f9", padding: "10px 16px", borderRadius: "8px 8px 0 0",
                                    border: "1px solid #cbd5e1", borderBottom: "none", fontSize: "14px", color: "#475569", fontWeight: "500"
                                }}>
                                    <span>📄 index.{currentLecture.language?.toLowerCase() || 'typescript'}</span>
                                    <span style={{ cursor: "pointer", fontSize: "12px" }}>📋 복사</span>
                                </div>
                                <div style={{ 
                                    backgroundColor: "#fff", padding: "15px", borderRadius: "0 0 8px 8px", 
                                    border: "1px solid #cbd5e1", overflowX: "auto", flex: 1 
                                }}>
                                    <SyntaxHighlighter
                                        language={currentLecture.language?.toLowerCase()}
                                        style={getThemeByLanguage(currentLecture.language)}
                                        customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "14px", lineHeight: "1.6" }}
                                    >
                                        {currentLecture.code_example}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        ) : (
                            /* 강의 내용 탭: 상세 설명 및 핵심 포인트만 출력 */
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                {/* 상세 설명 */}
                                <div>
                                    <h4 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 12px 0", color: "#1e293b", fontSize: "16px", fontWeight: "700" }}>
                                        💬 상세 설명
                                    </h4>
                                    <div style={{ color: "#475569", lineHeight: "1.8", whiteSpace: "pre-line", paddingLeft: "4px", fontSize: "15px" }}>
                                        {currentLecture.code_description}
                                    </div>
                                </div>

                                {/* 핵심 포인트 박스 */}
                                <div style={{
                                    background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px"
                                }}>
                                    <h5 style={{ margin: "0 0 10px 0", color: "#2563eb", fontSize: "15px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "700" }}>
                                        ⭐ 핵심 포인트
                                    </h5>
                                    <ul style={{ margin: 0, paddingLeft: "20px", color: "#64748b", fontSize: "14px", lineHeight: "1.7" }}>
                                        <li>제시된 코드의 컴포넌트 구조와 데이터 흐름을 분석합니다.</li>
                                        <li>가독성이 높은 반응형 박스 스타일과 인라인 속성을 이해합니다.</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 오른쪽 (구현 화면 브라우저 창) */}
                <div className="right-side" style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                }}>
                    <div style={{
                        flexShrink: 0, padding: "16px 20px", display: "flex", justifyContent: "space-between",
                        alignItems: "center", borderBottom: "1px solid #e2e8f0", background: "#fff"
                    }}>
                        <span style={{ fontWeight: "700", color: "#1e293b", display: "flex", alignItems: "center", gap: "8px" }}>
                            🖥️ 구현 화면
                        </span>
                        <a href={currentLecture.iframe_url} target="_blank" rel="noreferrer" style={{ 
                            fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: "600" 
                        }}>
                            새 창 열기 ↗
                        </a>
                    </div>

                    {/* 주소창 */}
                    <div style={{
                        background: "#f1f5f9", padding: "8px 16px", display: "flex", alignItems: "center", gap: "10px",
                        borderBottom: "1px solid #e2e8f0"
                    }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></div>
                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }}></div>
                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }}></div>
                        </div>
                        <div style={{
                            flex: 1, background: "#fff", border: "1px solid #cbd5e1", borderRadius: "6px",
                            padding: "4px 12px", fontSize: "12px", color: "#64748b", display: "flex", justifyContent: "space-between"
                        }}>
                            <span>preview.local/{currentLecture.language?.toLowerCase() || 'index'}</span>
                            <span style={{ opacity: 0.5 }}>🔄</span>
                        </div>
                    </div>

                    {/* iframe */}
                    <div style={{ flex: 1, minHeight: 0, overflow: "hidden", position: "relative", background: "#f8fafc" }}>
                        <iframe
                            src={currentLecture.iframe_url}
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                background: "#fff"
                            }}
                            title="preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LectureContent;