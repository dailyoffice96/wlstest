import "./CompanyIntro4.css";

const menuItems = [
  { icon: "📍", label: "목적지" },
  { icon: "🧭", label: "인기지" },
  { icon: "🎫", label: "교통패스" },
  { icon: "🛍️", label: "장바구니" },
  { icon: "🚕", label: "투어택시" },
  { icon: "💳", label: "카페" },
];

function CompanyIntro4() {
  return (
    <div className="company4-wrap">
      <div className="company4-top">
        <h2>회사소개</h2>
        <p>
          STUDY PORTAL <span>&gt;</span> 회사소개
        </p>
      </div>

      <section className="company4-box">
        <div className="company4-left">
          <span className="company4-label">MAIN</span>

          <h1>
            필요한 메뉴를 쉽게 제공하고
            <br />
            <strong>국내 여행지도</strong> 추천드려요.
          </h1>

          <p className="company4-desc">
            홈페이지 사용자가 원하는 여행 콘텐츠를 자유롭게 탐색하고 직접
            고를 수 있도록 다양한 레이아웃을 사용해 배치했어요.
          </p>

          <div className="company4-info">
            <div>
              <span>CONTENTS SECTION</span>
              <p>
                코레일이 서비스하는 국내여행 콘텐츠를 소개해요. 일상에서
                여행이 떠나고 싶을 순간, 쉽게 찾아볼 수 있는 상품과 각종
                특가 이벤트를 카드그리드로 모아서 배치해 사용자의 쉬운 탐색을
                유도합니다.
              </p>
            </div>

            <div>
              <span>QUICK SERVICE</span>
              <p>
                최상단에는 주요 서비스를 찾기 쉽게 아이콘으로 배치했어요.
                좌우로 슬라이드하여 더 많은 서비스를 살펴볼 수 있습니다.
              </p>
            </div>
          </div>

          <div className="company4-menu">
            {menuItems.map((item) => (
              <div className="company4-menu-item" key={item.label}>
                <i>{item.icon}</i>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="company4-right">
          <div className="phone-photo">
            <div className="phone-mockup">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="phone-time">19:00</div>

                <h3>정기권 · 특가 상품</h3>

                <div className="phone-card-row">
                  <div className="phone-card blue">
                    <span>추천 여행</span>
                    <strong>인기있는 국내 명소</strong>
                  </div>
                  <div className="phone-card gray">
                    <span>테마 여행</span>
                    <strong>감성 여행 코스</strong>
                  </div>
                </div>

                <p className="phone-section-title">지역별 대표 여행 상품</p>

                <div className="circle-list">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <p className="phone-section-title">코레일 정기 관광열차</p>

                <div className="thumb-list">
                  <div />
                  <div />
                </div>

                <div className="bottom-nav">
                  <span>⌂</span>
                  <span>▦</span>
                  <span>♡</span>
                  <span>☰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyIntro4;