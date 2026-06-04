import { useState } from "react";
import {
    FiBookOpen,
    FiPlayCircle,
    FiChevronLeft,
    FiChevronRight,
    FiTarget,
    FiUsers,
    FiCalendar,
    FiBarChart2
} from "react-icons/fi";

import "./HowToUse1.css";

const steps = [
    {
        number: 1,
        title: "상담 주제 찾기",
        desc: "내가 공부 중인 영역과 관심사를 선택하면 엑스퍼트 추천 리스트를 확인하세요.",
        imageTitle: "상담 주제 찾기",
        imageDesc: "학습 분야와 관심사를 선택하고 나에게 맞는 상담 주제를 탐색합니다.",
        tags: ["진로 상담", "학습 코칭", "포트폴리오", "자격증"]
    },
    {
        number: 2,
        title: "엑스퍼트 찾기",
        desc: "전문성, 후기/평점, 상담 분야, 가격, 상담 가능 시간을 비교하여 나에게 맞는 엑스퍼트를 찾아보세요.",
        imageTitle: "엑스퍼트 찾기",
        imageDesc: "검증된 전문가 목록을 비교하고 원하는 조건에 맞는 전문가를 선택합니다.",
        tags: ["전문가 비교", "후기 확인", "일정 확인", "가격 비교"]
    },
    {
        number: 3,
        title: "엑스퍼트 1:1 상담",
        desc: "원하는 엑스퍼트와 일정을 예약하고 1:1 맞춤형 상담을 진행하세요.",
        imageTitle: "1:1 맞춤 상담",
        imageDesc: "예약한 시간에 전문가와 연결되어 개인 맞춤형 상담을 받을 수 있습니다.",
        tags: ["실시간 상담", "맞춤 피드백", "자료 공유", "질문 답변"]
    },
    {
        number: 4,
        title: "상담 완료",
        desc: "상담 후기를 남기고 학습 가이드를 받아 더 효과적으로 성장하세요.",
        imageTitle: "상담 완료",
        imageDesc: "상담 결과를 정리하고 이후 학습 방향과 성장 가이드를 확인합니다.",
        tags: ["후기 작성", "학습 가이드", "성장 관리", "다음 상담"]
    }
];

function HowToUse1() {
    const [activeStep, setActiveStep] = useState(steps[0]);

    return (
        <div className="howto-page">

            <div className="howto-header">
                <div className="howto-title">
                    <FiBookOpen />
                    <h2>이용방법</h2>
                </div>

                <div className="howto-breadcrumb">
                    STUDY PORTAL <span>&gt;</span> 이용방법
                </div>
            </div>

            <section className="howto-hero">

                <div className="hero-heading">
                    <h1>엑스퍼트 이용 방법</h1>


                </div>

                <div className="howto-main">

                    <div className="step-area">

                        <div className="step-line" />

                        {steps.map((step) => (
                            <button
                                type="button"
                                key={step.number}
                                className={`step-item ${activeStep.number === step.number ? "active" : ""}`}
                                onClick={() => setActiveStep(step)}
                            >
                                <span className="step-number">
                                    {step.number}
                                </span>

                                <span className="step-card">
                                    <strong>{step.title}</strong>
                                    <em>{step.desc}</em>
                                </span>
                            </button>
                        ))}

                    </div>

                    <div className="preview-card">

                        <div className="code-panel">
                            <div className="code-window">
                                <div className="code-top">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <p className="code-label">HTML</p>
                                <pre>{`<div class="study-portal">
  <h3>${activeStep.imageTitle}</h3>
  <p>${activeStep.imageDesc}</p>
</div>`}</pre>
                            </div>

                            <div className="code-window">
                                <div className="code-top">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <p className="code-label">CSS</p>
                                <pre>{`.active-step {
  background: #0b5cff;
  color: #ffffff;
}`}</pre>
                            </div>

                            <div className="code-window">
                                <div className="code-top">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <p className="code-label">JS</p>
                                <pre>{`setActiveStep(${activeStep.number});`}</pre>
                            </div>
                        </div>

                        <div className="image-preview">
                            <div className="mock-card">
                                <span className="mock-badge">
                                    STEP {activeStep.number}
                                </span>

                                <h3>{activeStep.imageTitle}</h3>
                                <p>{activeStep.imageDesc}</p>

                                <div className="tag-list">
                                    {activeStep.tags.map((tag, index) => (
                                        <span key={index}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="photo-strip">
                                {activeStep.tags.map((tag, index) => (
                                    <div
                                        className={`photo-item photo-${index + 1}`}
                                        key={index}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            <div className="slider-control">
                                <FiChevronLeft />

                                <span></span>
                                <span></span>
                                <span className="active"></span>
                                <span></span>
                                <span></span>

                                <FiChevronRight />
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            <section className="benefit-section">

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <FiTarget />
                    </div>
                    <div>
                        <strong>맞춤형 매칭</strong>
                        <p>정확한 매칭으로 나에게 딱 맞는 전문가 연결</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <FiUsers />
                    </div>
                    <div>
                        <strong>전문가와 1:1 상담</strong>
                        <p>검증된 전문가와의 신뢰할 수 있는 1:1 상담</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <FiCalendar />
                    </div>
                    <div>
                        <strong>유연한 일정 관리</strong>
                        <p>내 일정에 맞춰 자유롭게 상담 시간 예약 가능</p>
                    </div>
                </div>

                <div className="benefit-item">
                    <div className="benefit-icon">
                        <FiBarChart2 />
                    </div>
                    <div>
                        <strong>성장 기회 제공</strong>
                        <p>상담 내용과 학습 가이드를 체계적으로 관리</p>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default HowToUse1;