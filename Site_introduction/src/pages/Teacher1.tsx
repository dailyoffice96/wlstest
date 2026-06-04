import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import "./Teacher1.css";

type Teacher = {
    id: number;
    name: string;
    field: string;
    desc: string;
    image: string;
    skills: string[];
    bg: string;
    category: string;
};

const teachers: Teacher[] = [
    {
        id: 1,
        name: "백성민",
        field: "백엔드 · 풀스택 개발",
        desc: "실무 프로젝트 중심의 강의로 개발 역량을 빠르게 성장시켜드립니다.",
        image: "/images/teacher01.png",
        skills: ["Java", "Spring Boot", "React"],
        bg: "blue",
        category: "dev",
    },

    {
        id: 2,
        name: "송태이",
        field: "프론트엔드 · 웹 디자인",
        desc: "사용자 경험을 고려한 웹 개발과 디자인 강의를 진행합니다.",
        image: "/images/teacher01.png",
        skills: ["HTML", "CSS", "Figma"],
        bg: "purple",
        category: "design",
    },

    {
        id: 3,
        name: "이언담",
        field: "데이터 분석 · AI",
        desc: "데이터 기반 분석 스킬과 AI 활용법을 쉽게 알려드립니다.",
        image: "/images/teacher01.png",
        skills: ["Python", "SQL", "AI"],
        bg: "green",
        category: "ai",
    },

    {
        id: 4,
        name: "이지은",
        field: "마케팅 · 비즈니스",
        desc: "실무에 바로 적용 가능한 마케팅 전략을 전합니다.",
        image: "/images/teacher01.png",
        skills: ["브랜딩", "콘텐츠", "SNS"],
        bg: "yellow",
        category: "marketing",
    },

    {
        id: 5,
        name: "김동현",
        field: "시스템 개발",
        desc: "안정적인 시스템 설계와 서버 개발 흐름을 가르칩니다.",
        image: "/images/teacher01.png",
        skills: ["Spring", "MySQL", "Docker"],
        bg: "sky",
        category: "dev",
    },

    {
        id: 6,
        name: "박지수",
        field: "UX/UI · 디자인",
        desc: "직관적이고 매력적인 디자인으로 사용자 경험을 높여드립니다.",
        image: "/images/teacher01.png",
        skills: ["UI/UX", "Adobe XD", "Figma"],
        bg: "pink",
        category: "design",
    },
];

function Teacher1() {

    const [activeTab, setActiveTab] = useState("all");

    const filteredTeachers =
        activeTab === "all"
            ? teachers
            : teachers.filter((teacher) => teacher.category === activeTab);

    return (
        <div className="teacher-page">

            <section className="teacher-hero">

                <div className="teacher-inner-top">

                    <div className="teacher-page-title">
                        <FiBookOpen />
                        <span>선생님 소개</span>
                    </div>

                    <div className="breadcrumb">
                        STUDY PORTAL <span>&gt;</span> 선생님 소개
                    </div>

                </div>

                <p className="teacher-label">
                    EXPERT INSTRUCTOR
                </p>

                <h1>
                    전문가 선생님 소개
                </h1>

                <p className="teacher-desc">
                    실무 경험과 풍부한 강의 노하우를 갖춘 전문가가
                    <br />
                    여러분의 성장을 함께 이끌어갑니다.
                </p>

                <div className="teacher-tabs">

                    <button
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        전체
                    </button>

                    <button
                        className={activeTab === "dev" ? "active" : ""}
                        onClick={() => setActiveTab("dev")}
                    >
                        개발 · 프로그래밍
                    </button>

                    <button
                        className={activeTab === "ai" ? "active" : ""}
                        onClick={() => setActiveTab("ai")}
                    >
                        데이터 · AI
                    </button>

                    <button
                        className={activeTab === "marketing" ? "active" : ""}
                        onClick={() => setActiveTab("marketing")}
                    >
                        비즈니스 · 마케팅
                    </button>

                    <button
                        className={activeTab === "design" ? "active" : ""}
                        onClick={() => setActiveTab("design")}
                    >
                        디자인 · UX/UI
                    </button>

                </div>

                <div className="teacher-grid">

                    {filteredTeachers.map((teacher) => (

                        <article
                            className="teacher-card"
                            key={teacher.id}
                        >

                            <div className={`teacher-photo-wrap ${teacher.bg}`}>
                                <img
                                    src={teacher.image}
                                    alt={`${teacher.name} 선생님`}
                                />
                            </div>

                            <div className="teacher-info">

                                <h3>
                                    {teacher.name} <span>선생님</span>
                                </h3>

                                <strong>
                                    {teacher.field}
                                </strong>

                                <p>
                                    {teacher.desc}
                                </p>

                                <div className="teacher-skills">

                                    {teacher.skills.map((skill) => (
                                        <span key={skill}>
                                            {skill}
                                        </span>
                                    ))}

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default Teacher1;