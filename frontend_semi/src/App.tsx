import Header from "./components/layout/Header";
import "./components/layout/Header.css";
import AppRoutes from "./routes/AppRoutes"

function App() {
  const isLogin = true;
  const userName = "KOTCHA";

  return (
    // 화면 전체 높이 차지 + 세로 배치 + 전체 스크롤 차단
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Header isLogin={isLogin} username={userName} />
      {/* Header 아래 남은 공간 전부를 차지 */}
      <div className="flex-fill overflow-hidden" style={{ minHeight: 0 }}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

{/*
  페이지별 변동주기
    <aside className="sidebar">
      <div className="sidebar-dom sidebar-dom1">{dom1}</div>
      <div className="sidebar-dom sidebar-dom2">{dom2}</div>
      <div className="sidebar-dom sidebar-dom3">{dom3}</div>
    </aside>
*/}