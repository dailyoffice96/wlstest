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
            default: return vs;
        }
    };

    if (!currentLecture) {
        return <div style={{ padding: "20px", color: "#64748b" }}>강의를 선택해주세요.</div>;
    }

    return (
        <div className="lecture-content-wrapper" style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "20px",
            gap: "20px",
            overflow: "hidden",
            boxSizing: "border-box"
        }}>
            {/* 1. 상단 정보 영역 (고정) */}
            <div className="content-header" style={{
                flexShrink: 0,
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0"
            }}>
                <h2 style={{ fontSize: "24px", margin: "0 0 10px 0" }}>{currentLecture.name}</h2>
                <div style={{ fontSize: "14px", color: "#64748b" }}>{currentLecture.lecture_goal}</div>
            </div>

            {/* 2. 메인 컨텐츠 영역 (2:1 비율 분할) */}
            <div className="content-body" style={{
                display: "flex",
                gap: "20px",
                flex: 1,
                minHeight: 0,
                overflow: "hidden"
            }}>

                {/* 왼쪽 (코드 & 설명 - flex: 2) */}
                <div className="left-side" style={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden"
                }}>
                    {/* 탭 버튼 */}
                    <div style={{ flexShrink: 0, display: "flex", borderBottom: "1px solid #e2e8f0" }}>
                        <button onClick={() => setActiveTab("code")} style={{
                            flex: 1, padding: "15px", border: "none", background: "none", cursor: "pointer",
                            borderBottom: activeTab === "code" ? "2px solid #0056b3" : "none",
                            fontWeight: activeTab === "code" ? "bold" : "normal"
                        }}>코드 예시</button>
                        <button onClick={() => setActiveTab("description")} style={{
                            flex: 1, padding: "15px", border: "none", background: "none", cursor: "pointer",
                            borderBottom: activeTab === "description" ? "2px solid #0056b3" : "none",
                            fontWeight: activeTab === "description" ? "bold" : "normal"
                        }}>코드 설명</button>
                    </div>

                    {/* 코드 및 내용 바디 (내부 스크롤) */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "15px", minHeight: 0 }}>
                        <SyntaxHighlighter
                            language={currentLecture.language}
                            style={getThemeByLanguage(currentLecture.language)}
                            customStyle={{ margin: 0, minHeight: "100%", fontSize: "14px" }}
                        >
                            {activeTab === "code" ? currentLecture.code_example : currentLecture.code_description}
                        </SyntaxHighlighter>
                    </div>
                </div>

                {/* 오른쪽 (구현 화면 - flex: 1) */}
                <div className="right-side" style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden"
                }}>
                    <div style={{
                        flexShrink: 0, padding: "15px", display: "flex", justifyContent: "space-between",
                        alignItems: "center", borderBottom: "1px solid #e2e8f0"
                    }}>
                        <span style={{ fontWeight: "bold" }}>🖥️ 구현 화면</span>
                        <a href={currentLecture.iframe_url} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#0056b3", textDecoration: "none" }}>새 창 열기 ↗</a>
                    </div>

                    {/* 💡 iframe 스케일 조정 박스 */}
                    <div style={{ flex: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>
                        <iframe
                            src={currentLecture.iframe_url}
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                                transform: "scale(1)",
                                transformOrigin: "top left"
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