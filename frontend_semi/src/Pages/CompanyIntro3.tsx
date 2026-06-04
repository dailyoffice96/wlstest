import "./CompanyIntro3.css";

const serviceCards = [
  {
    tag: "편리한 예매",
    title: "어려운 승차권 구입은\n직관·순쉬운 UX로 간단하게",
    icon: "📍",
    desc: "예약·탑승 흐름 최적화로\n누구나 쉽고 빠르게 이용할 수 있어요.",
  },
  {
    tag: "실시간 정보",
    title: "분산된 정보를 모아\n꼭 필요한 것만 보여주기",
    icon: "💬",
    desc: "실시간 운행 정보와 알림으로\n스마트한 이동을 지원해요.",
  },
  {
    tag: "맞춤형 알림",
    title: "이런 상품 · 서비스인지\n알기 쉽게 안내하기",
    icon: "🔔",
    desc: "내게 필요한 혜택과 정보를\n놓치지 않도록 알려드려요.",
  },
  {
    tag: "여행의 시작과 끝",
    title: "코레일톡만의 고유한\n사용자 경험 제공하기",
    icon: "🧳",
    desc: "예매부터 탑승, 서비스 이용까지\n여행의 전 과정을 함께해요.",
  },
];

function CompanyIntro3() {
  return (
    <div className="company3-wrap">
      <div className="company3-top">
        <h2>회사소개</h2>
        <p>
          STUDY PORTAL <span>&gt;</span> 회사소개
        </p>
      </div>

      <section className="company3-hero">
        <div className="company3-copy">
          <span className="company3-badge">SERVICE</span>

          <h1>
            공공 모빌리티 플랫폼,
            <br />
            <strong>코레일톡</strong>을 소개할게요!
          </h1>

          <p>
            편리한 예매·결제 시스템을 중심으로,
            <br />
            고객에게 최적화된 철도 서비스 경험을 제공합니다.
            <br />
            코레일의 디지털 혁신을 이끄는 코레일톡 플랫폼을 만나보세요.
          </p>
        </div>

        <div className="company3-visual">
          <div className="train-panel">
            <div className="korail-logo">KORAIL</div>
            <p>
              CONNECTING
              <br />
              THE PEOPLE'S HEARTS
            </p>
          </div>

          <div className="phone">
            <div className="phone-top" />
            <div className="phone-screen">
              <div className="phone-logo">KORAIL</div>

              <div className="app-icons">
                <span>🚆</span>
                <span>🕘</span>
                <span>🎫</span>
                <span>🧳</span>
                <span>🗺️</span>
              </div>

              <p className="phone-title">
                승차권 예매를 도와드릴게요.
              </p>

              <div className="ticket-box">
                <div>
                  <b>서울</b>
                  <small>출발역</small>
                </div>
                <span>→</span>
                <div>
                  <b>부산</b>
                  <small>도착역</small>
                </div>
              </div>

              <button>열차 조회하기</button>

              <div className="mini-list">
                <span>서울</span>
                <span>부산</span>
                <span>용산</span>
              </div>
            </div>
          </div>
        </div>

        <div className="company3-cards">
          {serviceCards.map((card, index) => (
            <article className="service-card" key={index}>
              <span className="service-tag">{card.tag}</span>

              <h3>
                {card.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>

              <div className="service-illust">{card.icon}</div>

              <p>
                {card.desc.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CompanyIntro3;