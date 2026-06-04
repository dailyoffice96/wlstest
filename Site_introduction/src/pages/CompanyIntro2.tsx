// CompanyIntro2.jsx

import "./CompanyIntro2.css";

const statsData = [
  {
    icon: "🎓",
    value: "10+",
    label: "교육 서비스 경험",
  },
  {
    icon: "👥",
    value: "5,000+",
    label: "누적 수강생",
  },
  {
    icon: "👍",
    value: "98%",
    label: "만족도",
  },
];

const missionData = [
  {
    icon: "🎓",
    title: "실무 중심 교육",
    desc: "현업에서 바로 적용 가능한\n실무형 교육 콘텐츠 제공",
  },
  {
    icon: "📈",
    title: "지속적인 혁신",
    desc: "최신 기술과 트렌드를 반영한\n지속적인 콘텐츠 업데이트",
  },
  {
    icon: "👥",
    title: "함께 성장하는 파트너",
    desc: "수강생의 성장과 성공을 위한\n맞춤형 학습 경험 제공",
  },
];

const valueData = [
  {
    icon: "🛡️",
    title: "신뢰",
    desc: "콘텐츠와 투명한 운영으로\n믿을 수 있는 교육 환경을 제공합니다.",
  },
  {
    icon: "💡",
    title: "전문성",
    desc: "전문 강사진과 체계적인\n커리큘럼으로 최고의 학습 경험을 제공합니다.",
  },
  {
    icon: "🚀",
    title: "혁신",
    desc: "새로운 기술과 학습 방법을 통해\n교육의 가능성을 확장합니다.",
  },
  {
    icon: "🌱",
    title: "지속가능성",
    desc: "새로운 관점을 생각하는 교육으로\n지속 가능한 미래를 추구합니다.",
  },
];

function CompanyIntro2() {
  return (
    <div className="company2-container">
      {/* 상단 */}
      <div className="company2-top">
        <h2>회사소개</h2>

        <div className="company2-breadcrumb">
          STUDY PORTAL <span>&gt;</span> 회사소개
        </div>
      </div>

      {/* 메인 비주얼 */}
      <section className="company2-hero">
        <div className="hero-left">
          <p className="small-title">ABOUT US</p>

          <h1>
            기술로 연결하고,
            <br />
            가치로 성장하는
            <br />
            <span>STUDY PORTAL</span>
          </h1>

          <p className="hero-desc">
            STUDY PORTAL은 ICT 실무 교육을 통해
            <br />
            개인의 성장을 지원하고, 지속 가능한 미래를
            <br />
            만들어가는 디지털 교육 파트너입니다.
          </p>

          <div className="stats-box">
            {statsData.map((item, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-icon">{item.icon}</div>

                <div>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 건물 영역 */}
        <div className="hero-right">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <div className="building">
            <div className="building-logo">
              📖
              <span>
                STUDY
                <br />
                PORTAL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 */}
      <section className="section-card">
        <div className="mission-left">
          <p className="section-sub">OUR MISSION</p>

          <h2>
            실무 중심의 교육으로
            <br />
            더 나은 내일을 만듭니다
          </h2>
        </div>

        <div className="mission-grid">
          {missionData.map((item, index) => (
            <div className="info-card" key={index}>
              <div className="info-icon">{item.icon}</div>

              <div>
                <h3>{item.title}</h3>

                <p>
                  {item.desc.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="section-card">
        <div className="value-title">
          <p className="section-sub">OUR CORE VALUE</p>
        </div>

        <div className="value-grid">
          {valueData.map((item, index) => (
            <div className="value-card" key={index}>
              <div className="value-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>
                {item.desc.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CompanyIntro2;