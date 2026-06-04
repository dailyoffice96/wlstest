import { useState } from "react";

import {
    FiBookOpen,
    FiGrid,
    FiCode,
    FiBarChart2,
    FiVolume2,
    FiPenTool,
    FiPlayCircle,
    FiMessageCircle,
} from "react-icons/fi";
import "./Teacher2.css";

type Category = "all" | "dev" | "ai" | "marketing" | "design";

type Teacher = {
    id: number;
    name: string;
    category: Category;
    categoryLabel: string;
    field: string;
    desc: string;
    image: string;
    color: "blue" | "purple" | "green" | "orange";
};

const teachers: Teacher[] = [
    {
        id: 1,
        name: "백성민",
        category: "dev",
        categoryLabel: "개발 · 프로그래밍",
        field: "백엔드 & 풀스택 개발 전문가",
        desc: "실무 프로젝트 중심의 강의로 개발 역량을 빠르게 성장시켜드립니다.",
        image: "/images/teacher01.png",
        color: "blue",
    },
    {
        id: 2,
        name: "송태이",
        category: "design",
        categoryLabel: "디자인 · UX/UI",
        field: "프론트엔드 & 웹 디자인 전문가",
        desc: "사용자 경험을 고려한 웹 개발과 디자인 강의를 진행합니다.",
        image: "/images/teacher01.png",
        color: "purple",
    },
    {
        id: 3,
        name: "이언담",
        category: "ai",
        categoryLabel: "데이터 · AI",
        field: "데이터 분석 & AI 전문가",
        desc: "데이터 기반 분석 스킬과 AI 활용법을 쉽게 알려드립니다.",
        image: "/images/teacher01.png",
        color: "green",
    },
    {
        id: 4,
        name: "이지은",
        category: "marketing",
        categoryLabel: "비즈니스 · 마케팅",
        field: "마케팅 전략 & 브랜딩 전문가",
        desc: "실무에 바로 적용 가능한 마케팅 전략을 전합니다.",
        image: "/images/teacher01.png",
        color: "orange",
    },
    {
        id: 5,
        name: "김동현",
        category: "dev",
        categoryLabel: "개발 · 프로그래밍",
        field: "시스템 개발 & 서버 전문가",
        desc: "안정적인 시스템 설계와 서버 개발 흐름을 가르칩니다.",
        image: "/images/teacher01.png",
        color: "blue",
    },
    {
        id: 6,
        name: "박지수",
        category: "design",
        categoryLabel: "디자인 · UX/UI",
        field: "UX/UI 디자인 전문가",
        desc: "직관적이고 매력적인 디자인으로 사용자 경험을 높여드립니다.",
        image: "/images/teacher01.png",
        color: "purple",
    },
];

const tabs = [
    { key: "all" as Category, label: "전체", icon: <FiGrid /> },
    { key: "dev" as Category, label: "개발 · 프로그래밍", icon: <FiCode /> },
    { key: "ai" as Category, label: "데이터 · AI", icon: <FiBarChart2 /> },
    { key: "marketing" as Category, label: "비즈니스 · 마케팅", icon: <FiVolume2 /> },
    { key: "design" as Category, label: "디자인 · UX/UI", icon: <FiPenTool /> },
];

function Teacher2() {
    const [activeTab, setActiveTab] = useState<Category>("all");

    const filteredTeachers =
        activeTab === "all"
            ? teachers
            : teachers.filter((teacher) => teacher.category === activeTab);

    return (
        <div className="teacher2-page">
            <section className="teacher2-wrap">
                <div className="teacher2-top">
                    <div className="teacher2-title">
                        <FiBookOpen />
                        <span>선생님 소개</span>
                    </div>

                    <div className="teacher2-breadcrumb">
                        STUDY PORTAL <span>&gt;</span> 선생님 소개
                    </div>
                </div>

                <div className="teacher2-heading">
                    <p>EXPERT INSTRUCTOR</p>
                    <h1>전문가 선생님 소개</h1>
                    <span>
                        실무 경험과 풍부한 강의 노하우를 갖춘 전문가가
                        <br />
                        여러분의 성장을 함께 이끌어갑니다.
                    </span>
                </div>

                <div className="teacher2-tabs">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.key}
                            className={activeTab === tab.key ? "active" : ""}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="teacher2-list">
                    {filteredTeachers.map((teacher) => (
                        <article
                            className={`teacher2-card ${teacher.color}`}
                            key={teacher.id}
                        >
                            <div className="teacher2-photo">
                                <img src={teacher.image} alt={`${teacher.name} 선생님`} />
                            </div>

                            <div className="teacher2-info">
                                <span className="teacher2-badge">
                                    {teacher.categoryLabel}
                                </span>

                                <h3>
                                    {teacher.name}
                                    <em>선생님</em>
                                </h3>

                                <strong>{teacher.field}</strong>

                                <p>{teacher.desc}</p>
                            </div>

                            <div className="teacher2-actions">
                                <button className="primary">
                                    <FiPlayCircle />
                                    대표강의 보기
                                </button>

                                <button className="outline">
                                    <FiMessageCircle />
                                    수강후기 보기
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Teacher2;