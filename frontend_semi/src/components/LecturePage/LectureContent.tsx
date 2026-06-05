import type { JSX } from "react";
import { useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors, prism, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";
import "./LectureContent.css";

interface LecturePageProps {
  currentLecture: Lecture | null;
  makeAdminButtons: (currentLecture: Lecture, navigate: any) => JSX.Element;
}

function LectureContent({ currentLecture, makeAdminButtons }: LecturePageProps) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"code" | "description">("code");

  const getThemeByLanguage = (language: string) => {
    if (!language) return prism;

    switch (language.toLowerCase()) {
      case "java":
        return prism;

      case "typescript":
        return vs;

      case "sql":
        return ghcolors;

      default:
        return prism;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("복사되었습니다!");
  };

  if (!currentLecture) {
    return (
      <div className="lecture-empty-box">
        강의실 목차에서 학습할 강의를 선택해 주세요.
      </div>
    );
  }

  const activeContent =
    activeTab === "code"
      ? currentLecture.code_example
      : currentLecture.code_description;

  return (
    <div className="lecture-content-page">
      <nav className="lecture-path-row">
        <div className="lecture-path-text">
          강의실 &gt;{" "}
          <span>{currentLecture.category}</span>
          {" "} &gt; {currentLecture.name}
        </div>

        <div className="lecture-admin-buttons">
          {makeAdminButtons(currentLecture, navigate)}
        </div>
      </nav>

      <div className="lecture-title-card">
        <div className="lecture-title-left">
          <div className="lecture-title-icon">
            &lt;/&gt;
          </div>

          <div className="lecture-title-text">
            <h2>{currentLecture.name}</h2>
            <p>{currentLecture.lecture_description}</p>
          </div>
        </div>

        <div className="lecture-title-deco">💻</div>
      </div>

      <div className="lecture-body-area">
        <div className="lecture-code-panel">
          <div className="lecture-tab-row">
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={
                activeTab === "code"
                  ? "lecture-tab-button active"
                  : "lecture-tab-button"
              }
            >
              🖥️ 코드 예시
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={
                activeTab === "description"
                  ? "lecture-tab-button active"
                  : "lecture-tab-button"
              }
            >
              📖 코드 설명
            </button>
          </div>

          <div className="lecture-tab-body">
            {activeTab === "code" ? (
              <div className="lecture-code-inner">
                <div className="lecture-code-header">
                  <span>📄 {currentLecture.language?.toUpperCase()}</span>

                  <button
                    type="button"
                    className="lecture-copy-button"
                    onClick={() => handleCopy(activeContent)}
                  >
                    📋 복사
                  </button>
                </div>

                <div className="lecture-code-scroll">
                  <SyntaxHighlighter
                    language={currentLecture.language?.toLowerCase()}
                    style={getThemeByLanguage(currentLecture.language || "")}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {currentLecture.code_example}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <div className="lecture-code-inner">
                <div className="lecture-code-header">
                  <span>📄 {currentLecture.language?.toUpperCase()}</span>

                  <button
                    type="button"
                    className="lecture-copy-button"
                    onClick={() => handleCopy(activeContent)}
                  >
                    📋 복사
                  </button>
                </div>

                <div className="lecture-code-scroll">
                  <SyntaxHighlighter
                    language={currentLecture.language?.toLowerCase()}
                    style={getThemeByLanguage(currentLecture.language || "")}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {currentLecture.code_description}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lecture-preview-panel">
          <div className="lecture-preview-header">
            <span>🖥️ 구현 화면</span>

            <a
              href={currentLecture.iframe_url}
              target="_blank"
              rel="noreferrer"
            >
              새 창 열기 ↗
            </a>
          </div>

          <div className="lecture-preview-scroll">
            <iframe
              src={currentLecture.iframe_url}
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