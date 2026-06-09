import type { JSX } from "react";
import { useEffect, useState } from "react";
import type { Lecture } from "../../types/Lecture";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  ghcolors,
  prism,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";
import customAxios from "../../api/axiosInstance";
import "./LectureContent.css";

interface LecturePageProps {
  currentLecture: Lecture | null;
  makeAdminButtons: (
    currentLecture: Lecture,
    navigate: any,
    user: User | null
  ) => JSX.Element | null;
  user: User | null;
}

function LectureContent({
  currentLecture,
  makeAdminButtons,
  user,
}: LecturePageProps) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"code" | "description">("code");

  useEffect(() => {
    if (!currentLecture?.id) {
      return;
    }

    customAxios
      .post(`/api/lecture/list/${currentLecture.id}/progress/view`)
      .catch((error) => {
        console.error("강의 열람 기록 저장 실패:", error);
      });
  }, [currentLecture?.id]);

  useEffect(() => {
    setActiveTab("code");
  }, [currentLecture?.id]);

  const getThemeByLanguage = (language: string) => {
    if (!language) return {};

    switch (language.toLowerCase()) {
      case "java":
        return prism;
      case "typescript":
      case "javascript":
        return vs;
      case "sql":
        return ghcolors;
      case "text":
        return {};
      default:
        return {};
    }
  };

  const handleCopy = (text?: string) => {
    if (!text) {
      alert("복사할 내용이 없습니다.");
      return;
    }

    navigator.clipboard.writeText(text);
    alert("복사되었습니다!");
  };

  if (!currentLecture) {
    return (
      <main className="lecture-content">
        <div className="lecture-content-empty">
          강의실 목차에서 학습할 강의를 선택해 주세요.
        </div>
      </main>
    );
  }

  const activeContent =
    activeTab === "code"
      ? currentLecture.code_example || ""
      : currentLecture.code_description || "";

  return (
    <main className="lecture-content">
      <nav className="lecture-breadcrumb-row">
        <div className="lecture-breadcrumb">
          강의실 &gt; {currentLecture.category} &gt;{" "}
          <span>{currentLecture.name}</span>
        </div>

        <div className="lecture-admin-area">
          {makeAdminButtons(currentLecture, navigate, user)}
        </div>
      </nav>

      <section className="lecture-hero-card">
        <div className="lecture-hero-left">
          <div className="lecture-icon-box">&lt;/&gt;</div>

          <div className="lecture-title-box">
            <p className="lecture-badge">LECTURE</p>

            <h1>{currentLecture.name}</h1>

            <p className="lecture-category-text">
             <strong>{currentLecture.category}</strong>
            </p>

            <div className="lecture-description-text">
              {currentLecture.lecture_description || "강의 설명이 없습니다."}
            </div>
          </div>
        </div>

        <div className="lecture-hero-symbol">💻</div>
      </section>

      <section className="lecture-workspace">
        <div className="lecture-code-card">
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

          <div className="lecture-code-body">
            <div className="lecture-code-toolbar">
              <span>
                📄{" "}
                {activeTab === "code"
                  ? currentLecture.language?.toUpperCase() || "CODE"
                  : "DESCRIPTION"}
              </span>

              <button
                type="button"
                className="lecture-copy-button"
                onClick={() => handleCopy(activeContent)}
              >
                📋 복사
              </button>
            </div>

            <div className="lecture-code-viewer">
              {activeContent ? (
                <SyntaxHighlighter
                  language={
                    activeTab === "code"
                      ? currentLecture.language?.toLowerCase()
                      : "text"
                  }
                  style={getThemeByLanguage(
                    activeTab === "code" ? currentLecture.language || "" : "text"
                  )}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    lineHeight: "1.65",
                    minHeight: "100%",
                    height: "100%",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        '"Consolas", "Monaco", "Courier New", monospace',
                    },
                  }}
                >
                  {activeContent}
                </SyntaxHighlighter>
              ) : (
                <div className="lecture-code-empty">
                  표시할 내용이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LectureContent;