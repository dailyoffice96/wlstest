import { useState } from "react";
import {
    FiBookOpen,
    FiChevronLeft,
    FiChevronRight,
    FiFeather,
    FiUsers,
    FiClipboard,
    FiHeart,
    FiCheckCircle
} from "react-icons/fi";

import "./HowToUse2.css";

const models = [
    {
        id: 1,
        title: "거래이관형",
        icon: <FiFeather />,
        badge: "인적성 검사",
        headline: "취업 준비 첫 단추,\n‘나’를 먼저 파악하고 시작하세요",
        desc: [
            "강점을 파악하고, 약점은 보완",
            "나에게 맞는 직업/직무 추천",
            "기업 인재상 맞춤 준비 전략",
            "검증된 데이터로 스펙 설계, 아끼지 준비"
        ],
        valueTitle: "이 모델의 핵심 가치",
        values: [
            "개인 분석 기반 맞춤 전략",
            "인재상 대비, 나만의 역량 강화",
            "시간과 비용 절감, 효율적 취업 준비"
        ],
        cardTitle: "나에게 맞는 방향 찾기",
        cardDesc: "검사 결과를 바탕으로 강점과 보완점을 분석해 취업 준비 방향을 제안합니다.",
        productTitle: "Career Insight",
        productSub: "Personal Analysis"
    },
    {
        id: 2,
        title: "시제품개발",
        icon: <FiUsers />,
        badge: "프로토타입",
        headline: "아이디어를 실제 서비스로,\n빠르게 검증하고 개선하세요",
        desc: [
            "서비스 콘셉트와 핵심 기능 정의",
            "사용자 흐름에 맞춘 화면 구성",
            "초기 시제품 제작 및 테스트",
            "피드백 기반 개선 방향 도출"
        ],
        valueTitle: "시제품개발의 장점",
        values: [
            "빠른 시장 검증",
            "개발 전 리스크 최소화",
            "사용자 중심 서비스 개선"
        ],
        cardTitle: "Prototype Builder",
        cardDesc: "아이디어를 시각화하고 테스트 가능한 결과물로 발전시킵니다.",
        productTitle: "Prototype",
        productSub: "UX Validation"
    },
    {
        id: 3,
        title: "입사지원",
        icon: <FiClipboard />,
        badge: "지원 전략",
        headline: "지원서부터 포트폴리오까지,\n합격 가능성을 높여보세요",
        desc: [
            "이력서와 자기소개서 구조화",
            "직무별 핵심 경험 정리",
            "포트폴리오 구성 및 보완",
            "기업 맞춤형 지원 전략 설계"
        ],
        valueTitle: "입사지원의 핵심 가치",
        values: [
            "직무 적합도 강화",
            "지원 서류 완성도 향상",
            "기업별 맞춤 지원 가능"
        ],
        cardTitle: "Application Kit",
        cardDesc: "지원 기업과 직무에 맞춰 서류와 포트폴리오를 정리합니다.",
        productTitle: "Apply Guide",
        productSub: "Resume & Portfolio"
    },
    {
        id: 4,
        title: "전략제휴",
        icon: <FiHeart />,
        badge: "협력 모델",
        headline: "함께 성장하는 협력 구조로,\n더 큰 기회를 만들어보세요",
        desc: [
            "협력 가능한 파트너 탐색",
            "상호 이익 기반 제휴 방향 설계",
            "역할과 책임을 명확히 분리",
            "장기적 성장 모델 구축"
        ],
        valueTitle: "전략제휴의 기대 효과",
        values: [
            "자원과 역량 공유",
            "시장 확장 기회 확보",
            "지속 가능한 협력 구조"
        ],
        cardTitle: "Partnership Model",
        cardDesc: "상호 강점을 연결해 장기적인 성장 기회를 만듭니다.",
        productTitle: "Partnership",
        productSub: "Growth Together"
    }
];

function HowToUse2() {
    const [active, setActive] = useState(models[0]);

    return (
        <div className="howto2-page">

            <div className="howto2-header">
                <div className="howto2-title">
                    <FiBookOpen />
                    <h2>회사소개</h2>
                </div>

                <div className="howto2-breadcrumb">
                    STUDY PORTAL <span>&gt;</span> 회사소개
                </div>
            </div>

            <section className="howto2-hero">

                <div className="howto2-heading">
                    <h1>
                        GREENCORE가 제안하는{" "}
                        <span>4가지 친환경 소재 협력 모델</span>
                    </h1>

                    <p>
                        검증된 기술력과 유연한 협업 구조로, 귀사의 ESG 목표 달성을 함께합니다.
                    </p>
                </div>

                <div className="model-tabs">
                    {models.map((model) => (
                        <button
                            type="button"
                            key={model.id}
                            className={`model-tab ${active.id === model.id ? "active" : ""}`}
                            onClick={() => setActive(model)}
                        >
                            <span className="model-tab-icon">
                                {model.icon}
                            </span>

                            <span>{model.title}</span>
                        </button>
                    ))}
                </div>

                <div className="model-content">

                    <button type="button" className="arrow-btn left">
                        <FiChevronLeft />
                    </button>

                    <div className="model-info">

                        <span className="model-badge">
                            {active.badge}
                        </span>

                        <h3>
                            {active.headline.split("\n").map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h3>

                        <ul className="model-list">
                            {active.desc.map((item, index) => (
                                <li key={index}>
                                    <span>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="value-box">
                            <strong>
                                <FiCheckCircle />
                                {active.valueTitle}
                            </strong>

                            {active.values.map((value, index) => (
                                <p key={index}>
                                    <FiCheckCircle />
                                    {value}
                                </p>
                            ))}
                        </div>

                    </div>

                    <div className="visual-area">

                        <div className="dark-code-card">
                            <div className="dark-code-top">
                                <span className="dot-red"></span>
                                <p>HTML</p>
                                <em>×</em>
                            </div>

                            <pre>{`<div class="card-container">
  <div class="card">
    <img src="image${active.id}.jpg" alt="" />
    <h3>${active.productTitle}</h3>
    <p>${active.productSub}</p>
  </div>
</div>`}</pre>

                            <div className="dark-code-top small">
                                <span className="dot-blue"></span>
                                <p>CSS (SCSS)</p>
                                <em>×</em>
                            </div>

                            <pre>{`.card-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
}`}</pre>

                            <div className="dark-code-top small">
                                <span className="dot-yellow"></span>
                                <p>JS (Babel)</p>
                                <em>×</em>
                            </div>

                            <pre>{`cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});`}</pre>
                        </div>

                        <div className="product-preview">

                            <div className="product-card">
                                <div className="product-image product-image-1">
                                    360.
                                </div>
                                <strong>{active.productTitle}</strong>
                                <p>{active.productSub}</p>
                                <button>자세히 보기</button>
                            </div>

                            <div className="product-card center">
                                <div className="product-image product-image-2">
                                    400.
                                </div>
                                <strong>{active.cardTitle}</strong>
                                <p>{active.cardDesc}</p>
                                <button>자세히 보기</button>
                            </div>

                            <div className="product-card faded">
                                <div className="product-image product-image-3">
                                    Bliss
                                </div>
                                <strong>{active.title}</strong>
                                <p>{active.productSub}</p>
                                <button>자세히 보기</button>
                            </div>

                            <div className="slider-line">
                                <button>
                                    <FiChevronLeft />
                                </button>
                                <span></span>
                                <span className="active"></span>
                                <span></span>
                                <button>
                                    <FiChevronRight />
                                </button>
                            </div>

                        </div>

                    </div>

                    <button type="button" className="arrow-btn right">
                        <FiChevronRight />
                    </button>

                </div>

            </section>

        </div>
    );
}

export default HowToUse2;